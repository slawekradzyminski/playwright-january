import { faker } from "@faker-js/faker";
import type { User, UserRole } from "../types/User";

const MAX_RETRIES = 10;

const generateValidValue = <T>(generator: () => T): T => {
  const validator = (value: T) => typeof value === "string" && value.length >= 4;

  let retryCount = 0;
  let value = generator();

  while (!validator(value) && retryCount < MAX_RETRIES) {
    value = generator();
    retryCount++;
  }

  if (!validator(value)) {
    throw new Error(`Could not generate valid value after maximum retries`);
  }
  return value;
};

export const getRandomUser = (): User => {
  return {
    username: generateValidValue(faker.internet.username),
    email: faker.internet.email(),
    password: generateValidValue(faker.internet.password),
    roles: ["ROLE_ADMIN", "ROLE_CLIENT"],
    firstName: generateValidValue(faker.person.firstName),
    lastName: generateValidValue(faker.person.lastName),
  };
};

