import { AddressRepository } from './service/addressRepository';
import { CertificationRepository } from './service/certificationRepository';
import { createDBClient } from './models';
import AddressHanders from "./handler/address";
import CertificationHanders from './handler/certification';

export { hello } from './handler/hello';

const addressRepo = new AddressRepository(createDBClient());
const certRepo = new CertificationRepository(createDBClient());

const addressHanders = AddressHanders(addressRepo, certRepo);
const certificationHanders = CertificationHanders(certRepo);

export const { getLinkAddress, createAddress, linkAddress, unlinkAddress } = addressHanders
export const { getCertText } = certificationHanders