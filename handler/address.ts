import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as cert from '../service/certificationCache';
import { middleware, RequiredParams } from '../util/middleware';
import db from '../models';

const requiredParam: RequiredParams = {
  queryParams: ['publicKey', 'token', 'linkaddress', 'accountaddress']
}

export const getCertText: APIGatewayProxyHandler = middleware(
  async (param) => {
    const publicKey = param.queryParams.publicKey;
    const token = param.queryParams.token;
    const linkaddress = param.queryParams.linkaddress;
    const accountaddress = param.queryParams.accountaddress;
    const valid = await cert.checkValidation(publicKey, token);
    if(!valid) {
      return { statusCode: 400, body: 'invalid certification token' }
    }
    const res = await db.address.findByPk(linkaddress);
    return {
      statusCode: 200,
      body: JSON.stringify({
        token
      }, null, 2),
    }
  },
  requiredParam
)
