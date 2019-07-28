import { APIGatewayProxyHandler } from "aws-lambda";

export default interface TagHandler {
    getTags: APIGatewayProxyHandler
}