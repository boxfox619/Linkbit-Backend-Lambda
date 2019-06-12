import { AddressRepository } from './service/addressRepository';
import { LinkRepository } from './service/linkRepository';
import { CertificationRepository } from './service/certificationRepository';
import { createDBClient } from './models';
import AddressHanders from "./handler/address";
import LinkHanders from "./handler/link";
import CertificationHanders from './handler/certification';

export { hello } from './handler/hello';

const dbClient = createDBClient();
const addressRepo = new AddressRepository(dbClient);
const certRepo = new CertificationRepository(dbClient);
const linkRepo = new LinkRepository(dbClient, addressRepo);

const addressHanders = AddressHanders(addressRepo, certRepo);
const certificationHanders = CertificationHanders(certRepo);
const linkHanders = LinkHanders(addressRepo, linkRepo, certRepo);

export const { deleteAddress, createAddress } = addressHanders
export const { getAddressMap, getLinkAddress, linkAddress, unlinkAddress } = linkHanders
export const { getCertText } = certificationHanders