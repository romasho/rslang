import type { IWord, IUserInput, IUserResponse, IValidErrResponse, ILoginResponse } from '../interfaces/requestsInterfaces';
import { loadState, saveState } from './state';

export async function getWords(group?: number, page?: number): Promise<IWord[] | []> {
  const url = new URL('https://rs-lang-team-be.herokuapp.com/words');

  if (group) url.searchParams.set('group', group.toString());
  if (page) url.searchParams.set('page', page.toString());

  try {
    const result = await fetch(url.toString());

    return result.json();
  } catch {
    return [];
  }
}

export async function getWord(id: string): Promise<IWord | null> {
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/words/${id}`);

    return await result.json();
  } catch {
    return null;
  }
}

export async function createUser(user: IUserInput): Promise<IUserResponse | IValidErrResponse | null> {
  try {
    const result = await fetch('https://rs-lang-team-be.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });

    return await result.json();
  } catch {
    return null;
  }
}

export async function signIn(user: Omit<IUserInput, 'name'>): Promise<ILoginResponse | IValidErrResponse | null> {
  try {
    const result = await fetch('https://rs-lang-team-be.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    const parsed = await result.json();

    const { name, userId: id, token } = parsed;
    loadState().auth = { name, id, token };
    saveState();

    return parsed;
  } catch {
    return null;
  }
}

export async function getUser(id: string): Promise<IUserResponse | null> {
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${loadState().auth?.token}`
      }
    });

    return await result.json();
  } catch {
    return null;
  }
}

export async function getUserWords(id: string): Promise<IUserResponse | null> {
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${id}/words`, {
      headers: {
        'Authorization': `Bearer ${loadState().auth?.token}`
      }
    });

    return await result.json();
  } catch {
    return null;
  }
}