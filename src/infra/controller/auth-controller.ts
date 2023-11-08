import { ApplicationError } from "../../app/errors";

type AuthControllerRequest = {
  email: string;
  password: string;
};

export class AuthController {
  async handle(params: AuthControllerRequest) {
    try {
      return {
        success: true,
        token: "TOKEN RETORNADO PELO CASO DE USO",
        statusCode: 200,
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
