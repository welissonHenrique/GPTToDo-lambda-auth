import { AuthController } from "../controller/auth-controller";

export const makeAuthSession = () => {
  const controller = new AuthController();
  return controller;
};
