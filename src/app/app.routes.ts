import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {PrivateComponent} from './private/private.component';
import {canActivateAuthRole} from './auth.guard';

export const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [canActivateAuthRole],
  }
];
