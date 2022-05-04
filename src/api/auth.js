import faker from "@faker-js/faker";
import { resolvePromise } from "../common/fake";

export function signIn(email, password) {
  const data = {
    id: 0,
    email,
    avatar: faker.internet.avatar()
  };

  return resolvePromise(data, 1000);
}