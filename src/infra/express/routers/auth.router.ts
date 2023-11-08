import { Request, Response, Router } from "express";
import { makeAuthSession } from "../../factories/make-auth-user";

const authRoutes = Router();
authRoutes.post("/session", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const controller = makeAuthSession();
  const httpResponse = await controller.handle({ email, password });
  return res.status(httpResponse.statusCode).json(httpResponse);
});

export { authRoutes };
