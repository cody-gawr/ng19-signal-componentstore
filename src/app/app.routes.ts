import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/chat-notify/chat-notify.component').then((m) => m.ChatNotifyComponent),
  },
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
];
