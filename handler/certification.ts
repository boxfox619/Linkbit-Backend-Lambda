import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { response } from '../models/lambda';
import { CertificationUsecase } from '../models/domain';
import CertificationHandler from '../models/handler/certificationHander';

const handlers = (certRepo: CertificationUsecase): CertificationHandler => ({
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