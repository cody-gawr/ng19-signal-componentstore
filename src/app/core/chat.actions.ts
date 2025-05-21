import { createAction, props } from '@ngrx/store';

export const messageReceived = createAction(
  '[Chat] Message Received',
  props<{ user: string; message: string }>(),
);
