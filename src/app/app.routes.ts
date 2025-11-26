import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav';
import { LoginComponent } from './components/login/login';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { AuthGuard } from './guards/auth.guards';

export const routes: Routes = [

  { path: '', component: LoginComponent },

  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: TecnicoListComponent }, // temporário, só p/ testar
      { path: 'tecnicos', component: TecnicoListComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
