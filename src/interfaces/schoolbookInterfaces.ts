import { IWord, IWordAggr } from "./requestsInterfaces";

export interface IChapter {
  chapter: number,
  name: string,
}

export interface IBookState {
  chapter: number,
  page: number,
  isDict: boolean
}

export type BookData = IWord[] | [];

export interface IWordCard {
  data: IWord
}
export interface IChaptersProps {
  onChange: Function,
  chapter: number
}

export interface IDictProp {
  data: IWordAggr
}