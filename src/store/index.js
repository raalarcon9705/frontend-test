import { configureStore } from '@reduxjs/toolkit'
import channelsReducer, { channelsMiddleware } from './features/channels';
import authReducer, { authMiddleware } from './features/auth';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    auth: authReducer
  },
  middleware: defaultMiddleware => defaultMiddleware()
    .prepend(channelsMiddleware)
    .prepend(authMiddleware)
});
