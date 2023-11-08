import { ApplicationError } from "../../app/errors";
import { SessionUseCase } from "../../app/session/session";

type AuthControllerRequest = {
  email: string;
  password: string;
};

export class AuthController {
  constructor(private readonly authUseCase: SessionUseCase) {}

  async handle(params: AuthControllerRequest) {
    try {
      const session = await this.authUseCase.execute(params);

      return {
        success: true,
        statusCode: 200,
        ...session,
      };
    } catch (error) {
      if (error instanceof ApplicationError) {
        return {
          success: false,
          message: error.message,
          statusCode: error.statusCode,
          name: error.name,
        };
      }

      return {
        success: false,
        message: "Erro interno do servidor",
        name: "InternalServerError",
        statusCode: 500,
      };
    }
  }
}
