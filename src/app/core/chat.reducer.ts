import { createReducer, on } from '@ngrx/store';
import { messageReceived } from './chat.actions';

export interface ChatState {
  messages: { user: string; message: string }[];
}

export const initialState: ChatState = {
  messages: [],
};

export const chatReducer = createReducer(
  initialState,
  on(messageReceived, (state, { user, message }) => ({
    ...state,
    messages: [...state.messages, { user, message }],
  })),
);
