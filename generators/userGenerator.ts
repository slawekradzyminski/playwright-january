import { faker } from '@faker-js/faker';
import type { User, UserRole } from '../types/User';

const MAX_RETRIES = 10;

const generateValidValue = <T>(
  generator: () => T,
  validator: (value: T) => boolean,
  errorMessage: string
): T => {
  let retryCount = 0;
  let value = generator();

  while (!validator(value) && retryCount < MAX_RETRIES) {
    value = generator();
    retryCount++;
  }

  if (!validator(value)) {
    throw new Error(errorMessage);
  }

  return value;
};

export const getRandomUser = (): User => {
  const firstName = generateValidValue(
    () => faker.person.firstName(),
    (value) => value.length >= 4,
    'Could not generate valid firstName after maximum retries'
  );

  const lastName = generateValidValue(
    () => faker.person.lastName(),
    (value) => value.length >= 4,
    'Could not generate valid lastName after maximum retries'
  );

  const username = generateValidValue(
    () => faker.internet.username(),
    (value) => value.length >= 4,
    'Could not generate valid username after maximum retries'
  );

  const password = generateValidValue(
    () => faker.internet.password(),
    (value) => value.length >= 4,
    'Could not generate valid password after maximum retries'
  );

  const roles: UserRole[] = ['ROLE_ADMIN', 'ROLE_CLIENT'];

  return {
    username,
    email: faker.internet.email({ firstName, lastName }),
    password,
    roles,
    firstName,
    lastName,
  };
};
