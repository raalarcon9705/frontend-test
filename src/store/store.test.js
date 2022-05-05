import { newMessage } from '../common/fake';
import { login } from './features/auth';
import { addMessage, loadChannels, selectChannel } from './features/channels';
import store from './store';

describe('Auth state tests', () => {
  it('Should initially set auth to an empty object', () => {
    const state = store.getState().auth
    expect(state).toEqual({})
  })

  it('After "login" action loading must be set to true', async () => {
    store.dispatch(login({ email: 'email@example.com', password: 'qwerty.123'}));
    const state = store.getState().auth;
    const loading = state.loading;
    await new Promise((r) => setTimeout(r, 50));
    expect(loading).toEqual(true);
  })

  it('After "loginSuccess" the user must be set', async () => {
    store.dispatch(login({ email: 'email@example.com', password: 'qwerty.123'}));
    await new Promise((r) => setTimeout(r, 3000));
    const state = store.getState().auth;
    const user = state.user;
    expect(!!user).toEqual(true);
  })
})

describe('Channels state tests', () => {
  it('Should initially set channels to a default entity state', () => {
    const state = store.getState().channels;
    expect(state).toEqual({ ids: [], entities: {} })
  })

  it('After "loadChannels" action loading must be set to true', async () => {
    store.dispatch(loadChannels());
    const state = store.getState().channels;
    const loading = state.loading;
    await new Promise((r) => setTimeout(r, 50));
    expect(loading).toEqual(true);
  })

  it('Mark first channel as selected', async () => {
    store.dispatch(loadChannels());
    await new Promise((r) => setTimeout(r, 3500));
    const state = store.getState().channels;
    const firstChannel = state.entities[state.ids[0]];
    expect(firstChannel).not.toEqual(undefined);

    store.dispatch(selectChannel(firstChannel.id));
    await new Promise((r) => setTimeout(r, 50));
    const selected = store.getState().channels.selected;
    expect(selected).toEqual(firstChannel.id);
  })

})