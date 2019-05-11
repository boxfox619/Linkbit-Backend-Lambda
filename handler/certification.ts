import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as cert from '../service/certificationCache';
import { middleware, RequiredParams } from '../util/middleware';
import { response } from '../models';

const requiredParam: RequiredParams = {
  queryParams: ['publicKey']
}

export const getCertText: APIGatewayProxyHandler = middleware(
  async (param) => {
    const publicKey = param.queryParams.publicKey;
    const token = await cert.createCertText(publicKey);
    return response(200, { token });
  },
  requiredParam
) 
