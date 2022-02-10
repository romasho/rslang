import { IStorage } from '../interfaces/storageInterface';

let storage: IStorage = {
  auth: null
};

const saveState = () => localStorage.setItem('storage', JSON.stringify(storage));

const loadState = () => {
  const loadedStorage = localStorage.getItem('storage');
  if (!loadedStorage) {
    saveState();
  } else {
    storage = JSON.parse(loadedStorage);
  }
  return storage;
};

const defaultStorage = storage;

export { defaultStorage, saveState, loadState };