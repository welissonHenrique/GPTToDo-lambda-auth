import { Database } from "../../app/contracts";

export class MongoDB implements Database {
  async getUserByEmail(email: string): Promise<any> {
    return true;
  }
}
