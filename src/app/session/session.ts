import { JwtService } from "../../infra/services/jwt.service";
import { Database } from "../contracts";
import { ApplicationError } from "../errors";
import { SessionDTO } from "./session.dto";

export class SessionUseCase {
  constructor(
    private readonly mongodbAdapter: Database,
    private readonly jwtService: JwtService
  ) {}

  async execute(parameters: SessionDTO) {
    this.#validateParams(parameters);

    const { email, password } = parameters;
    const user = await this.mongodbAdapter.getUserByEmail(email);

    if (!user) {
      throw new ApplicationError(
        `Usuário não encontrado.`,
        400,
        "BadRequestError"
      );
    }

    await this.jwtService.validateUserPassword({
      passwordHash: password,
      userPassword: user.password,
    });

    const token = await this.jwtService.generateSessionToken(user.id);
    return { token };
  }

  #validateParams(parameters: SessionDTO) {
    if (!parameters) {
      throw new ApplicationError(
        `Parâmetros não encontrados.`,
        400,
        "BadRequestError"
      );
    }

    if (!parameters.email) {
      throw new ApplicationError(
        `Parâmetro 'e-mail' não encontrado.`,
        400,
        "BadRequestError"
      );
    }

    if (!parameters.password) {
      throw new ApplicationError(
        `Parâmetro 'password' não encontrado.`,
        400,
        "BadRequestError"
      );
    }
  }
}
