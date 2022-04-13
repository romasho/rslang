import { IBookState } from '../interfaces/schoolbookInterfaces';
import { IStorage } from '../interfaces/storageInterface';

let storage: IStorage = {
  auth: null
};

const sessionState: IBookState = Object.freeze({
  chapter: 0,
  page: 1,
  isDict: false,
});

const saveState = () => localStorage.setItem('storage', JSON.stringify(storage));

const saveSessionState = (obj: IBookState) => sessionStorage.setItem('bookState', JSON.stringify(obj))

const loadState = () => {
  const loadedStorage = localStorage.getItem('storage');
  if (!loadedStorage) {
    saveState();
  } else {
    storage = JSON.parse(loadedStorage);
  }
  return storage;
};

const loadSessionState = () => {
  const bookMemory = sessionStorage.getItem('bookState');

  return bookMemory ? JSON.parse(bookMemory) : sessionState;
}

const defaultStorage = storage;

export { defaultStorage, saveState, loadState, saveSessionState, loadSessionState };