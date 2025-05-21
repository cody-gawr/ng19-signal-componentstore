import Pusher from 'pusher-js';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private pusher = new Pusher(environment.pusher.key, {
    cluster: environment.pusher.cluster,
  });
  constructor() {}

  subscribeToChannel<T>(
    channelName: string = environment.pusher.channel,
    eventName = environment.pusher.event,
  ): Observable<T> {
    return new Observable<T>((observer) => {
      const channel = this.pusher.subscribe(channelName);
      channel.bind(eventName, (data: T) => {
        observer.next(data);
      });
      return () => {
        channel.unbind(eventName);
        this.pusher.unsubscribe(channelName);
      };
    });
  }
}
