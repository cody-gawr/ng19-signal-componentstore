import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from './chat.reducer';

export const selectChatFeature = createFeatureSelector<ChatState>('chat');

export const selectMessages = createSelector(selectChatFeature, (state) => state.messages);
