import { configureStore } from '@reduxjs/toolkit'
import channelsReducer, { channelsMiddleware } from './features/channels';
import authReducer, { authMiddleware } from './features/auth';
import usersReducer, { usersMiddleware } from './features/users';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    users: usersReducer,
    auth: authReducer
  },
  middleware: defaultMiddleware => defaultMiddleware()
    .prepend(channelsMiddleware)
    .prepend(authMiddleware)
    .prepend(usersMiddleware)
});
