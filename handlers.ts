import { ItemRepository, PurchaseRepository, TagRepository } from './service';
import ItemHandlers from "./handler/item";
import PurchaseHandlers from "./handler/purchase";
import TagHanders from './handler/tag';

const itemsRepo = new ItemRepository();
const purchaseRepo = new PurchaseRepository();
const tagRepo = new TagRepository();

const itemHandlers = ItemHandlers(itemsRepo);
const purchaseHandlers = PurchaseHandlers(purchaseRepo);
const tagHandlers = TagHanders(tagRepo);

export const { getItems } = itemHandlers;
export const { getTags } = tagHandlers;
export const { purchase } = purchaseHandlers;
export { corsHandler } from './handler/cors';