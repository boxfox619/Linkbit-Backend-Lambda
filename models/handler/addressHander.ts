import { APIGatewayProxyHandler } from "aws-lambda";

export default interface AddressHandler {
    createAddress: APIGatewayProxyHandler,
    deleteAddress: APIGatewayProxyHandler
  }
  