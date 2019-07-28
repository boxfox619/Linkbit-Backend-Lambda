import { APIGatewayProxyHandler } from "aws-lambda";

export default interface PurchaseHandler {
    purchase: APIGatewayProxyHandler
}