import { createEntityAdapter, createListenerMiddleware, createSlice } from '@reduxjs/toolkit'
import { createMessage, getChannels } from '../../../api/channels';
import { getBinary, getTimeout, newChannel, newMessage } from '../../../common/fake';
import { createSliceSelector } from '../../../common/utilities';

const channelsAdapter = createEntityAdapter();

const slice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    loadChannels: (state) => ({
      ...state,
      loading: true
    }),
    loadChannelsSuccess: (state, action) => {
      action = ({
        ...action,
        payload: action.payload.map(ch => ({...ch, user: ch.user.id}))
      })
      return channelsAdapter.addMany({
        ...state,
        loading: false
      }, action);
    },
    selectChannel: (state, { payload }) => ({
      ...state,
      selected: payload
    }),
    addMessage: (state, { payload }) => ({
      ...state,
      entities: {
        ...state.entities,
        [state.selected]: {
          ...state.entities[state.selected],
          messages: state.entities[state.selected].messages.concat(payload)
        }
      }
    }),
    addMessageSuccess: (state, { payload: { id, message }}) => ({
      ...state,
      entities: {
        ...state.entities,
        [state.selected]: {
          ...state.entities[state.selected],
          messages: state.entities[state.selected].messages.map(msg => msg.id === id ? message : msg)
        }
      }
    }),
    receiveMessage: (state, { payload }) => ({
      ...state,
      entities: {
        ...state.entities,
        [state.selected]: {
          ...state.entities[state.selected],
          messages: state.entities[state.selected].messages.concat(payload)
        }
      }
    }),
    removeMessage: (state, { payload }) => ({
      ...state,
      entities: {
        ...state.entities,
        [state.selected]: {
          ...state.entities[state.selected],
          messages: state.entities[state.selected].messages.filter(msg => msg.id !== payload)
        }
      }
    }),
    setEditing: (state, { payload }) => ({
      ...state,
      editing: `${state.selected}.${payload}`
    }),
    cancelEditing: (state) => ({
      ...state,
      editing: undefined
    }),
    editMessage: (state, { payload }) => {
      const [, messageId] = state.editing.split('.');
      return {
        ...state,
        editing: undefined,
        entities: {
          ...state.entities,
          [state.selected]: {
            ...state.entities[state.selected],
            messages: state.entities[state.selected].messages
              .map(msg => msg.id === +messageId ? ({...msg, text: payload}) : msg)
          }
        }
      }
    },
    addChannel: (state, { payload }) => {
      const channel = newChannel();
      channel.messages = [];
      channel.user = payload;
      return channelsAdapter.addOne(state, channel);
    }
  },
  
});

const listenerMiddleware = createListenerMiddleware();

const selectSliceState = createSliceSelector(slice);

const selectors = channelsAdapter.getSelectors(selectSliceState);

export const {
  loadChannels,
  loadChannelsSuccess,
  selectChannel,
  addMessage,
  removeMessage,
  setEditing,
  cancelEditing,
  editMessage
} = slice.actions;

export const selectChannelsLoading = state => selectSliceState(state).loading;
export const selectEditing = state => {
  const feature = selectSliceState(state);
  if (!feature.editing) {
    return;
  }
  const [channelId, messageId] = feature.editing.split('.');
  return feature.entities[channelId].messages.find(msg => msg.id === +messageId);
};
export const selectSelectedId = state => selectSliceState(state).selected;
export const selectSelectedChannel = state => {
  const entities = selectors.selectEntities(state);
  const selected = selectSelectedId(state);
  let channel = entities[selected]; 
  if (channel) {
    channel = {...channel, user: state.users.entities[channel.user]}
  }
  return channel;
};
export const selectAllChannels = state => {
  const channels = selectors.selectAll(state);
  return channels.map(ch => ({
    ...ch,
    user: state.users.entities[ch.user]
  }));
}

listenerMiddleware.startListening({
  actionCreator: loadChannels,
  effect: async (_, { dispatch }) => {
    const channels = await getChannels();
    dispatch(slice.actions.loadChannelsSuccess(channels));
  }
});

listenerMiddleware.startListening({
  actionCreator: addMessage,
  effect: async ({ payload: msg }, { dispatch }) => {
    const message = await createMessage(msg.text);
    dispatch(slice.actions.addMessageSuccess({ id: msg.id, message }))
  }
});

listenerMiddleware.startListening({
  actionCreator: addMessage,
  effect: async (_, { dispatch, getState }) => {
    if (getBinary()) {
      const state = getState();
      const from = state.channels.entities[state.channels.selected].user.id;
      const message = newMessage();
      message.from = from;
      setTimeout(() => {
        message.date = Date.now();
        dispatch(slice.actions.receiveMessage(message))
      }, getTimeout());
    }
  }
})

export const { middleware: channelsMiddleware } = listenerMiddleware;

export default slice.reducer;