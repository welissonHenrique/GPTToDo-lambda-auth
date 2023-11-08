import { Database } from "../../app/contracts";

export class MongoDb implements Database {
  async getUserByEmail(email: string) {
    return true;
  }
}
