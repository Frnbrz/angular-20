import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'characters',
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./characters/characters').then((m) => m.Characters),
  },
];
