import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit'
import { signIn } from '../../../api/auth';
import { createSliceSelector } from '../../../common/utilities';

const slice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    login: (state) => ({
      ...state,
      loading: true
    }),
    loginSuccess: (state, {payload}) => ({
      ...state,
      loading: false,
      user: payload
    })
  }
});

const listenerMiddleware = createListenerMiddleware();


export const selectAuthSlice = createSliceSelector(slice);
export const selectLoggedUser = state => selectAuthSlice(state).user;
export const selectAuthLoading = state => selectAuthSlice(state).loading;
export const selectLoggedUserId = state => selectLoggedUser(state)?.id;

export const {
  login
} = slice.actions;

listenerMiddleware.startListening({
  actionCreator: login,
  effect: async ({payload: { email, password }}, { dispatch }) => {
    const data = await signIn(email, password);
    dispatch(slice.actions.loginSuccess(data));
  }
})

export const { middleware: authMiddleware } = listenerMiddleware;


export default slice.reducer;