import { createEntityAdapter, createListenerMiddleware, createSlice } from '@reduxjs/toolkit'
import { createSliceSelector } from '../../../common/utilities';
import { loadChannelsSuccess } from '../channels';

const usersAdapter = createEntityAdapter();

const slice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addUsers: usersAdapter.addMany
  },
});

const listenerMiddleware = createListenerMiddleware();

const selectSliceState = createSliceSelector(slice);

const selectors = usersAdapter.getSelectors(selectSliceState);

export const { addUsers } = slice.actions;

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUsersEntities,
  selectById: selectUserById
} = selectors;

listenerMiddleware.startListening({
  actionCreator: loadChannelsSuccess,
  effect: async ({ payload }, { dispatch }) => {
    const users = payload.map(ch => ch.user);
    dispatch(addUsers(users));
  }
})

export const { middleware: usersMiddleware } = listenerMiddleware;

export default slice.reducer;