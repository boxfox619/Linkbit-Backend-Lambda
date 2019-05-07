import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as cert from '../service/certificationCache';
import { middleware, RequiredParams } from '../util/middleware';

const requiredParam: RequiredParams = {
  queryParams: ['publicKey']
}

export const getCertText: APIGatewayProxyHandler = middleware(
  async (param) => {
    const publicKey = param.queryParams.publicKey;
    const token = await cert.createCertText(publicKey);
    return {
      statusCode: 200,
      body: JSON.stringify({
        token
      }, null, 2),
    };
  },
  requiredParam
) 
