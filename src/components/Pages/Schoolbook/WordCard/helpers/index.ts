import { loadState } from "../../../../../utils/state";
import { IUserWord } from "../../../../../interfaces/requestsInterfaces";
import { createUserWord, updateUserWord } from "../../../../../utils/services";

type diffColor = "error" | "inherit" | "secondary" | "disabled" | "action" | "primary" | "info" | "success" | "warning" | undefined;

export function isDifficult(wordId: string, userWords: IUserWord[] | null): diffColor {
  if (!userWords || userWords.length === 0) return 'inherit';

  const userWord = userWords.find(item => item.wordId === wordId);

  if (!userWord) return 'inherit';

  return userWord.difficulty === 'hard' ? 'secondary' : 'inherit'
}

export async function changeDifficulty(wordId: string, userWords: IUserWord[] | null) {
  const memory = loadState().auth;

  if (!memory) return false;

  const userId = memory.id

  if (!userWords) return false;

  if (userWords.length === 0) {
    await createUserWord({ userId, wordId, word: { difficulty: "hard", optional: { count: 1, isLearned: false } } });
    return true;
  }

  const userWord = userWords.find(item => item.wordId === wordId);

  if (userWord) {
    const diff = userWord.difficulty === 'easy' ? 'hard' : 'easy';

    const word = {
      difficulty: diff,
      optional: {
        count: 1,
        isLearned: false
      }
    }

    await updateUserWord({ userId, wordId, word });
  } else {
    await createUserWord({ userId, wordId, word: { difficulty: "hard", optional: { count: 1, isLearned: false } } });
  }

  return true;
}

export function isLearnedWord(wordId: string, userWords: IUserWord[] | null) {
  if (!userWords || userWords.length === 0) return 'inherit';

  const userWord = userWords.find(item => item.wordId === wordId);

  if (!userWord) return 'inherit';

  const { isLearned } = userWord.optional;

  return isLearned ? 'success' : 'inherit'
}

export async function changeLearned(wordId: string, userWords: IUserWord[] | null) {
  const memory = loadState().auth;

  if (!memory) return false;

  const userId = memory.id

  if (!userWords) return false;

  if (userWords.length === 0) {
    await createUserWord({ userId, wordId, word: { difficulty: "easy", optional: { count: 3, isLearned: true } } });
    return true;
  }

  const userWord = userWords.find(item => item.wordId === wordId);

  if (userWord) {
    const value = userWord.optional.isLearned;

    const optional = {
      count: value ? 1 : 3,
      isLearned: !value
    }

    const word = {
      difficulty: 'easy',
      optional
    }

    await updateUserWord({ userId, wordId, word });
  } else {
    await createUserWord({ userId, wordId, word: { difficulty: "easy", optional: { count: 3, isLearned: true } } });
  }

  return true;
}

export function getCardShadowColor(diff: diffColor, learn: diffColor) {
  if (diff === 'inherit' && learn === 'inherit') return '0';

  if (diff === 'secondary') return 'rgba(217, 83, 79, 0.37)';

  if (learn === 'success') return 'rgba(46, 125, 50, 0.37)';

  return '0';
}