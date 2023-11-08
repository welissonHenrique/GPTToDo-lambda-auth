import express, { RequestHandler } from "express";
import { authRoutes } from "./infra/express/routers/auth.router";

const app = express();
app.use(express.json() as RequestHandler);
app.use(authRoutes);

export { app };
