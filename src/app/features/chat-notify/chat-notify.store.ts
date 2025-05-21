import { Injectable, computed, inject, signal } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { PusherService } from '../../core/pusher.service';

@Injectable()
export class ChatNotifyStore extends ComponentStore<{}> {
  private pusher = inject(PusherService);

  constructor() {
    super();
  }
}
