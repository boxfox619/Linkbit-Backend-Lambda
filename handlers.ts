import { AddressRepository } from './service/addressRepository';
import { CertificationRepository } from './service/certificationRepository';
import { createDBClient } from './models';
import AddressHanders from "./handler/address";
import CertificationHanders from './handler/certification';

export { hello } from './handler/hello';

const addressRepo = new AddressRepository(createDBClient());
const certRepo = new CertificationRepository(createDBClient());

export const addressHanders = AddressHanders(addressRepo, certRepo);
export const certificationHanders = CertificationHanders(certRepo);