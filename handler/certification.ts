import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { CertificationRepository }from '../service/certificationRepository';
import { middleware } from '../util/middleware';
import { response } from '../models';

const certificationRepo = new CertificationRepository();

export const getCertText: APIGatewayProxyHandler = middleware(
  async (param) => {
    const publicKey = param.queryParams.publicKey;
    const token = await certificationRepo.createCertText(publicKey);
    return response(200, { token });
  },
  { queryParams: ['publicKey'] }
) 
