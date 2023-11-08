import { Database } from "../contracts";
import { ApplicationError } from "../errors";
import { SessionDTO } from "./session.dto";

export class SessionUseCase {
  constructor(private readonly mongodbAdapter: Database) {}

  async execute(parameters: SessionDTO) {
    this.#validateParams(parameters);

    const { email } = parameters;
    const user = await this.mongodbAdapter.getUserByEmail(email);

    if (!user) {
      throw new ApplicationError(
        `Usuário não encontrado.`,
        400,
        "BadRequestError"
      );
    }
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
