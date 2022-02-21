import { IWord, IWordAggr } from "./requestsInterfaces";

export interface IChapter {
  chapter: number,
  name: string,
}

export interface IBookState {
  chapter: number,
  page: number,
  isDict: boolean,
  game?: 'sprint' | 'audio-call',
}

export type BookData = IWord[] | [];

export interface IWordCard {
  data: IWord,
  changeBookState: Function,
  prevState: number
}
export interface IChaptersProps {
  onChange: Function,
  chapter: number
}

export interface IDictProp {
  data: IWordAggr
}

export interface ITrainigProps {
  isDisabled: boolean
}