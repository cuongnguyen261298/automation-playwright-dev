import { faker } from "@faker-js/faker";
export const generateNameWithUUID = (name: string) =>
  `${name} ${faker.string.uuid()}`;

export const generateWithUUID = () => `${faker.string.uuid()}`;

export const generateSentence = (min = 3, max = 5) =>
  faker.lorem.sentence({ min: min, max: max });

export const nameWithNanoId = (name: string) =>
  `${name} ${faker.string.nanoid(12)}`;

export const generateCountry = () => faker.location.country();

export const generateEmail = () =>
  `user+${Math.floor(Date.now() / 1000)}@gmail.com`;

export const generateCompany = () => faker.company.name();

export const generateFirstName = () => faker.person.firstName();

export const generateLastName = () => faker.person.lastName();
