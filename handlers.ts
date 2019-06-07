import { AddressRepository } from './service/addressRepository';
import { CertificationRepository } from './service/certificationRepository';
import { createDBClient } from './models';
import AddressHanders from "./handler/address";

export { hello } from './handler/hello';
export { getCertText } from './handler/certification';

const addressRepo = new AddressRepository(createDBClient());
const certRepo = new CertificationRepository(createDBClient());

export const addressHanders = AddressHanders(addressRepo, certRepo);