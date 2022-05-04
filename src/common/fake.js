import { faker } from '@faker-js/faker';

let uid = 1;
let myId = 0;

export function newUid(){
  return uid++;
}

export function resolvePromise(data, timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  })
}

export function newUser() {
  return {
    id: newUid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    avatar: faker.internet.avatar()
  }
}

export function newText() {
  return faker.lorem.sentence()
}

export function newMessage(from) {
  return {
    id: newUid(),
    date: faker.date.recent().getTime(),
    text: newText(),
    from: faker.datatype.boolean() ? from : myId
  }
}

export function newChannel() {
  const user = newUser();
  return {
    id: newUid(),
    user,
    messages: Array.from({ length: faker.datatype.number({ min: 0 }) % 10 + 1 })
      .map(() => newMessage(user.id))
      .sort((a, b) => a.date - b.date)
  }
}

export function getBinary() {
  return faker.datatype.boolean();
}

export function getTimeout() {
  return faker.datatype.number({ min: 1000, max: 5000 });
}