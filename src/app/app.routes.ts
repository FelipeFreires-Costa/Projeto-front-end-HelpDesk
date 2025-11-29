import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav';
import { LoginComponent } from './components/login/login';
import { HomeComponent } from './components/home/home';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';

import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { AuthGuard } from './guards/auth.guards';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },

      // ROTAS CORRETAS PARA TÉCNICOS
      { path: 'tecnicos', component: TecnicoListComponent },
      { path: 'tecnicos/create', component: TecnicoCreateComponent },
      { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent },
      { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },

      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/create', component: ClienteCreateComponent },
      { path: 'clientes/update/:id', component: ClienteUpdateComponent },
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];