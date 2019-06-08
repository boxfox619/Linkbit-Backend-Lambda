import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { response } from '../models';
import { CertificationUsecase } from '../domain/certification';

const handlers = (certRepo: CertificationUsecase): { [name: string]: APIGatewayProxyHandler } => ({
  getCertText: middleware(
    async (param) => {
      const publicKey = param.queryParams.publicKey;
      const token = await certRepo.createCertText(publicKey);
      return response(200, { token });
    },
    { queryParams: ['publicKey'] }
  ) 
});

export default handlers;