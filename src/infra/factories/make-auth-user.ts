import { SessionUseCase } from "../../app/session/session";
import { AuthController } from "../controller/auth-controller";
import { MongoDB } from "../database/mongodb";
import { JwtService } from "../services/jwt.service";

export const makeAuthSession = () => {
  const jwtService = new JwtService();
  const mongodb = new MongoDB();

  const usecase = new SessionUseCase(mongodb, jwtService);
  const controller = new AuthController(usecase);
  return controller;
};
