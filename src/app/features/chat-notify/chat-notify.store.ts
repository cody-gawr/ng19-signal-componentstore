import { Injectable, computed, inject, signal } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { PusherService } from '../../core/pusher.service';
import { ChatMessage, ChatNotifyState } from './chat-notify.state';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class ChatNotifyStore extends ComponentStore<ChatNotifyState> {
  private pusher = inject(PusherService);

  constructor() {
    super({ connected: false, messages: [] });
    this.connectToChat();
  }

  // Selectors
  readonly connected$ = this.select((state) => state.connected);
  readonly messages$ = this.select((state) => state.messages);

  // Signals
  readonly connected = toSignal(this.connected$, { initialValue: false });
  readonly messages = toSignal(this.messages$, { initialValue: [] });

  // Updaters
  readonly addMessage = this.updater((state, msg: ChatMessage) => ({
    ...state,
    messages: [...state.messages, msg],
  }));

  readonly setConnected = this.updater((state, connected: boolean) => ({
    ...state,
    connected,
  }));

  readonly connectToChat = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => {
        this.setConnected(true);
        this.pusher.connectToChat<ChatMessage>().subscribe((msg) => {
          this.addMessage(msg);
        });
      }),
    ),
  );

  readonly simulateIncomingMessage = this.updater((state, msg: ChatMessage) => ({
    ...state,
    messages: [...state.messages, msg],
  }));
}
