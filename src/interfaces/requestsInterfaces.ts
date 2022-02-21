interface IWord {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

interface IUserInput {
  name: string;
  email: string;
  password: string;
}

interface IUserResponse {
  email: string;
  id: string,
  name: string;
}


interface IErr {
  message: string;
  path: [string];
}

interface IResponseErr {
  error: {
    errors: IErr[],
    status: 'failed'
  };
}

interface ILoginResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

interface IUserWord {
  id: string;
  difficulty: string;
  optional: {
    count: number,
    isLearned: boolean,
  };
  wordId: string;
}

type IUserWordInput = Omit<IUserWord, 'id' | 'wordId'>

interface IAggregatedWordsInput {
  id: string;
  group?: number;
  page?: number;
  wordsPerPage?: number;
  filter?: string;
}

type IWordAggregated = Omit<IWord, 'id'>;

interface IWordAggr extends IWordAggregated {
  _id: string;
}

interface IAggregatedWords {
  paginatedResults: IWordAggr[],
  totalCount: { count: number };
}

interface IStatistic {
  id?: string
  learnedWords: number;
  optional: {
    audiocall: {
      successfulPercent:number;
      correcInRow: number;
      numberNewWordsPerDay: {
        [key: string]: number;
      }
    },
    sprint: {
      successfulPercent:number;
      correcInRow: number;
      numberNewWordsPerDay: {
        [key: string]: number;
      }
    }
  };
}

interface ISettings {
  id: string
  wordsPerDay?: number;
  optional?: {};
}

export type { IWord, IUserInput, IUserResponse, IResponseErr, ILoginResponse, IUserWord, IUserWordInput, IAggregatedWordsInput, IAggregatedWords, IStatistic, ISettings, IWordAggr }