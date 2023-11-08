export type Database = {
  getUserByEmail: (email: string) => Promise<boolean>;
};
