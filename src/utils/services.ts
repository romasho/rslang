import type { IWord, IUserInput, IUserResponse, IResponseErr, ILoginResponse, IUserWordInput, IUserWord, IAggregatedWordsInput, IAggregatedWords, IStatistic, ISettings } from '../interfaces/requestsInterfaces';
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

export async function createUser(user: IUserInput): Promise<IUserResponse | IResponseErr | null> {
  const result = await fetch('https://rs-lang-team-be.herokuapp.com/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  });
  try {
    if (result.status === 417) return {
      error: {
        errors: [
          {
            message: await result.text(),
            path: ['email']
          }
        ],
        status: 'failed'
      }
    };
    return await result.json()
  } catch {
    return null
  }
}

export async function signIn(user: Omit<IUserInput, 'name'>): Promise<ILoginResponse | IResponseErr | null> {
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

export async function getUserWords(id: string): Promise<IUserWord[] | null> {
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

export async function getUserWord({ id, wordId }: { id: string, wordId: string }): Promise<IUserWord | IResponseErr | null> {
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${id}/words/${wordId}`, {
      headers: {
        'Authorization': `Bearer ${loadState().auth?.token}`
      }
    });

    return await result.json();
  } catch {
    return null;
  }
}

export async function createUserWord({ userId, wordId, word }: { userId: string, wordId: string, word: IUserWordInput }): Promise<IUserWord | null> {
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${loadState().auth?.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word),
    });

    return await result.json();
  } catch {
    return null;
  }
}

export async function updateUserWord({ userId, wordId, word }: { userId: string, wordId: string, word: IUserWordInput }): Promise<IUserWord | IResponseErr | null> {
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${loadState().auth?.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });

    return await result.json();
  } catch {
    return null;
  }
}

export async function deleteUserWord({ userId, wordId }: { userId: string, wordId: string }): Promise<boolean> {
  const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${loadState().auth?.token}`
    }
  });

  return result.ok;
}


export async function getUserAggregatedWords(filter: IAggregatedWordsInput): Promise<IAggregatedWords[] | null> {
  const id = filter.id? filter.id : loadState().auth?.id;
  const url = new URL(`https://rs-lang-team-be.herokuapp.com/users/${id}/aggregatedWords`);

  if (filter.group) url.searchParams.set('group', filter.group.toString());
  if (filter.page) url.searchParams.set('page', filter.page.toString());
  if (filter.wordsPerPage) url.searchParams.set('wordsPerPage', filter.wordsPerPage.toString());
  if (filter.filter) url.searchParams.set('filter', filter.filter.toString());

  try {
    const result = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${loadState().auth?.token}`
      }
    });

    return await result.json();
  } catch {
    return null;
  }
}

export async function getUserStatistic(id: string): Promise<IStatistic | null> {
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${id}/statistics`, {
      headers: {
        'Authorization': `Bearer ${loadState().auth?.token}`
      }
    });

    return await result.json();
  } catch {
    return null;
  }
}

export async function updateUserStatistic(statistic: IStatistic): Promise<IStatistic | IResponseErr | null> {
  const { learnedWords, optional } = statistic;
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${statistic.id}/statistics`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${loadState().auth?.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ learnedWords, optional })
    });

    return await result.json();
  } catch {
    return null;
  }
}

export async function getUserSettings(id: string): Promise<IStatistic | null> {
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${id}/settings`, {
      headers: {
        'Authorization': `Bearer ${loadState().auth?.token}`
      }
    });

    return await result.json();
  } catch {
    return null;
  }
}

export async function updateUserSettings(settings: ISettings): Promise<ISettings | IResponseErr | null> {
  const { wordsPerDay, optional } = settings;
  try {
    const result = await fetch(`https://rs-lang-team-be.herokuapp.com/users/${settings.id}/settings`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${loadState().auth?.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wordsPerDay, optional })
    });

    return await result.json();
  } catch {
    return null;
  }
}

export function signOut(): void {
  loadState().auth = null;
  saveState();
}

/*
Examples of usage:
--------------------------------------------------------------------------------------------------------------------------------------------------
  Interactions with general list of words:

    getWords() => list of all words

    getWord('5e9f5ee35eb9e72bc21af4a1') => get individual word by id
--------------------------------------------------------------------------------------------------------------------------------------------------
  Interactions with authorization:

    createUser({ name: 'ExampleDude', email: 'example3@gmail.com', password: '123456789'}) => create new user and return created object

    signIn({email: 'example@gmail.com', password: '12345678'}) => login and return user object with token, also saves user credentials in local storage

    signOut() => logout by resetting current user credentials in local storage

    getUser('61feaf3049f2c80016c599b0') => get individual user by id
--------------------------------------------------------------------------------------------------------------------------------------------------
  Interactions with user's words (needs authentication):

    createUserWord({
      userId: "61feaf3049f2c80016c599b0",
      wordId: "5e9f5ee35eb9e72bc21af4a1",
      word: { difficulty: "weak", optional: { testParam: true } }
    }) => create word in user's word storage. You can store anything in 'optional' param or not use it at all

    getUserWords('61feaf3049f2c80016c599b0') => get all words from user's storage

    getUserWord({ id: "61feaf3049f2c80016c599b0", wordId: "5e9f5ee35eb9e72bc21af4a1"}) => get individual word from user's storage

    updateUserWord({
      userId: "61feaf3049f2c80016c599b0",
      wordId: "5e9f5ee35eb9e72bc21af4a3",
      word: { difficulty: "weak", optional: { testParam: true } }
    })) => change individual word in user's storage. You can store anything in 'optional' param or not use it at all

    deleteUserWord({
      userId: "61feaf3049f2c",
      wordId: "5e9f5ee35eb9e72bc21af4a1"
    }) => delete individual word in user's storage
--------------------------------------------------------------------------------------------------------------------------------------------------
  Interactions with user aggregated words (needs authentication):

    getUserAggregatedWords({
      id: '61feaf3049f2c80016c599b0',
      group: 0,
      page: 0,
      wordsPerPage: 20,
      filter: '{"userWord.difficulty":"hard"}'
    }) => gets filtered words from general word list. All params except id are unnecessary. 'Filter' param uses MongoDB Query object
--------------------------------------------------------------------------------------------------------------------------------------------------
  Utils:

    getUserStatistic( "61feaf3049f2c80016c599b0") => get user statistic obj

    updateUserStatistic({id: "61feaf3049f2c80016c599b0", learnedWords: 10, optional: { difficulty: 0 }}) => change/create user statistic obj. You can store anything in 'optional' param or not use it at all

    getUserSettings( "61feaf3049f2c80016c599b0") => get user setting obj

    updateUserSettings({id: "61feaf3049f2c80016c599b0", optional: { theme: 'dark' }}) => change/create user setting obj. You can store anything in 'optional' param or not use it at all

*/