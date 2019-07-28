import { APIGatewayProxyHandler } from "aws-lambda";

export default interface ItemHandler {
    getItems: APIGatewayProxyHandler,
  }
  