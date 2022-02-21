import { IStatistic, IUserWord, IWord } from "../../interfaces/requestsInterfaces";
import { createUserWord, getUserStatistic, getUserWords, updateUserStatistic, updateUserWord } from "../../utils/services";
import { loadState } from "../../utils/state";

const isAuth = loadState().auth?.id;
const date = new Date();
const currentDay = date.toISOString().split('T')[0];

export const defaultStatistics: IStatistic = {
    id: isAuth,
    learnedWords: 0,
    optional: {
        audiocall: {
            successfulPercent: 0,
            correcInRow: 0,
            numberNewWordsPerDay: {
                [currentDay]: 0,
            },
            numberLearnedWordsPerDay: {
                [currentDay]: 0,
            }
        },
        sprint: {
            successfulPercent: 0,
            correcInRow: 0,
            numberNewWordsPerDay: {
                [currentDay]: 0,
            },
            numberLearnedWordsPerDay: {
                [currentDay]: 0,
            }
        }
    }
}

export async function udateStatistics(words: IWord[], usersAnswers: boolean[], successfulPercent: number, correcInRow: number, gameName: string) {

    if (isAuth) {
        const usersWords = (await getUserWords(isAuth) as IUserWord[]);
        let usersStatistics = (await getUserStatistic(isAuth)) as IStatistic;
        if (!usersStatistics) {
            usersStatistics = defaultStatistics;
        }
        const learnedWords = usersWords.reduce((acc, word) => {
            if (word.optional.isLearned === true) return acc + 1;
            return acc
        }, 0)

        defaultStatistics.learnedWords = learnedWords;
        defaultStatistics.optional = usersStatistics.optional;
        const gameWay = (gameName === 'audiocall') ? defaultStatistics.optional.audiocall : defaultStatistics.optional.sprint;
        gameWay.correcInRow = correcInRow > gameWay.correcInRow ? correcInRow : gameWay.correcInRow;
        gameWay.successfulPercent = (gameWay.successfulPercent === 0) ? successfulPercent : (successfulPercent + gameWay.successfulPercent) / 2;


        words.forEach((word, index) => {
            const isWordInArray = usersWords?.find((userWord) => userWord.wordId === word.id);

            if (!isWordInArray) {
                const newCount = usersAnswers[index] ? 1 : 0;
                createUserWord({
                    userId: isAuth, wordId: word.id, word: {
                        difficulty: "easy",
                        optional: {
                            count: newCount,
                            isLearned: false,
                        }
                    }
                });
                gameWay.numberNewWordsPerDay[currentDay] += 1;
            } else {
                const { difficulty, optional } = isWordInArray;
                const newCount = usersAnswers[index] ? (optional.count + 1) : 0;
                const isHard = (difficulty === 'easy') ? 'easy' : 'hard';
                const necessaryForStudying = (difficulty === 'easy') ? 3 : 5;
                const isLearned = newCount >= necessaryForStudying;
                if (isLearned) gameWay.numberLearnedWordsPerDay[currentDay] += 1;

                updateUserWord({
                    userId: isAuth, wordId: word.id, word: {
                        difficulty: isHard,
                        optional: {
                            isLearned,
                            count: newCount,
                        }
                    }
                });
            }
        });
        updateUserStatistic(defaultStatistics);
    }
}