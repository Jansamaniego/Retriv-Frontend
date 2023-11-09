import { factory, primaryKey } from '@mswjs/data';

import { faker } from '@faker-js/faker';

const modelDictionary = {
  cart: {
    id: primaryKey(faker.datatype.uuid),
    email: () => faker.internet.email(),
    items: () => [faker.string.numeric(5)],
    totalPrice: () => faker.number.int(5),
    totalQuantity: () => faker.number.int(1),
  },

  cartItem: {
    id: primaryKey(faker.datatype.uuid),
    product: () => faker.string.numeric(5),
    _id: () => faker.string.numeric(5),
    totalProductQuantity: () => faker.number.int(1),
    totalProductPrice: () => faker.number.int(4),
    shop: () => faker.string.numeric(5),
    shopOwner: () => faker.string.numeric(5),
    category: () => faker.string.numeric(5),
  },

  product: {
    id: primaryKey(faker.datatype.uuid),
    product: () => faker.string.numeric(5),
    shop: () => faker.string.numeric(5),
    _id: () => faker.string.numeric(5),
    totalProductPrice: () => faker.number.int(4),
    totalProductQuantity: () => faker.number.int(2),
    name: () => 'test product',
    slug: () => faker.string.alphanumeric(4),
    price: () => faker.string.numeric(3),
    mainImage: () => faker.string.alphanumeric(8),
    mainImageId: () => faker.string.alphanumeric(8),
    images: () => [faker.string.alphanumeric(8), faker.string.alphanumeric(8)],
    imagesIds: () => [
      faker.string.alphanumeric(8),
      faker.string.alphanumeric(8),
    ],
    description: faker.commerce.productDescription,
    category: () => faker.string.alphanumeric(8),
    shopOwner: () => faker.string.alphanumeric(8),
    quantityInStock: () => faker.number.int(3),
    quantitySold: () => faker.number.int(2),
    isOutOfStock: () => false,
  },
};

export const db = factory(modelDictionary);
