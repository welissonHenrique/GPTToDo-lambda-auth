import serverless from "serverless-http";
import { app } from "./src/setup";

const handler = serverless(app);

module.exports.handler = async (event: any, context: any) => {
  const result = await handler(event, context);
  return result;
};
