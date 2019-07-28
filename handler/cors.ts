import { APIGatewayProxyHandler } from "aws-lambda";
import { middleware } from '../util/middleware';
import { response } from "../models/lambda";

export const corsHandler: APIGatewayProxyHandler = middleware(
  async () => {
    return response(201, "")
  },
  {}
)