import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path: "home",
    component: NavComponent,
  }
];
