type User = {
  id: string;
  email: string;
  password: string;
  token: string;
};

export type Database = {
  getUserByEmail: (email: string) => Promise<User>;
};
