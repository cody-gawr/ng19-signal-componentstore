import { Component, inject, OnInit } from '@angular/core';
import { ChatNotifyStore } from './chat-notify.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-notify',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-notify.component.html',
  styleUrls: ['./chat-notify.component.scss'],
  providers: [ChatNotifyStore],
})
export class ChatNotifyComponent implements OnInit {
  readonly store = inject(ChatNotifyStore);
  readonly connected = this.store.connected;
  readonly messages = this.store.messages;
  constructor() {}

  ngOnInit() {}

  // Form inputs
  username = '';
  text = '';

  sendMessage() {
    if (!this.username.trim() || !this.text.trim()) return;

    const message = {
      user: this.username,
      message: this.text,
    };

    // In real app: send to backend, which then emits via Pusher
    console.log('[SEND]', message);

    // TEMP: simulate local dispatch
    this.store.simulateIncomingMessage(message);

    this.text = ''; // clear input
  }
}
