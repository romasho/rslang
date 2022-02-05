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


interface IValidErr {
  message: string;
  path: string[];
}

interface IValidErrResponse {
  error: {
    errors: IValidErr[],
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



export type { IWord, IUserInput, IUserResponse, IValidErrResponse, ILoginResponse };