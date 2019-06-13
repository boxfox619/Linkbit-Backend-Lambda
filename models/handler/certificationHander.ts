import { APIGatewayProxyHandler } from "aws-lambda";

export default interface CertificationHandler {
    getCertText: APIGatewayProxyHandler
}