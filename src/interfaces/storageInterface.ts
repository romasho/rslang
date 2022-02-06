interface IStorage {
  auth: {
    name: string;
    id: string;
    token: string;
  } | null;
}

export type { IStorage };