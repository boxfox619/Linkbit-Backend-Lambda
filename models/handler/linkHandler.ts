import { APIGatewayProxyHandler } from "aws-lambda";

export default interface LinkHandler {
    getAddressMap: APIGatewayProxyHandler,
    getLinkAddress: APIGatewayProxyHandler,
    linkAddress: APIGatewayProxyHandler,
    unlinkAddress: APIGatewayProxyHandler
}