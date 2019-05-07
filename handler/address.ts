import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { missingParameters } from '../models/response';
import * as cert from '../service/certificationCache';

export const getCertText: APIGatewayProxyHandler = async (event, _context) => {
  const publicKey = event.queryStringParameters.publicKey;
  if(!publicKey){
    return missingParameters(['publicKey']);
  }
  const token = await cert.createCertText(publicKey);
  return {
    statusCode: 200,
    body: JSON.stringify({
      token
    }, null, 2),
  };
}
