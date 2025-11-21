import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav';
import { LoginComponent } from './components/login/login';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';

export const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path: "home",
    component: NavComponent,
  },
    { path: 'tecnicos', component: TecnicoListComponent },
  { path: 'tecnicos/create', component: TecnicoCreateComponent },
  { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent },
  { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },
];
