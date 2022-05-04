import { newChannel, newMessage, resolvePromise } from "../common/fake";

export function getChannels() {
  const data = Array.from({ length: 20 })
    .map(() => new newChannel());
  return resolvePromise(data, 3000);
}

export function createMessage(text) {
  const data = newMessage(0);
  data.from = 0;
  data.text = text;
  data.date = Date.now();

  return resolvePromise(data, 500);
}