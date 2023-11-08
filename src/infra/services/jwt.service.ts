import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ApplicationError } from "../../app/errors";

type JwtServiceProps = {
  passwordHash: string;
  userPassword: string;
};

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export class JwtService {
  async validateUserPassword({ passwordHash, userPassword }: JwtServiceProps) {
    const match = await bcrypt.compare(passwordHash, userPassword);

    if (!match) {
      throw new ApplicationError(
        "E-mail ou senha incorretos",
        400,
        "BadRequestError"
      );
    }
  }

  async generateSessionToken(id: string) {
    const token = jwt.sign({ sub: id }, JWT_SECRET_KEY, { expiresIn: "7d" });
    return token;
  }
}
