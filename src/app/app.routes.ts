import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav';
import { LoginComponent } from './components/login/login';
import { HomeComponent } from './components/home/home';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { AuthGuard } from './guards/auth.guards';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '', 
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      // 🔥 AQUI ESTÁ A CORREÇÃO:
      { path: 'home', component: HomeComponent }, // Agora home carrega a Home de verdade
      
      { path: 'tecnicos', component: TecnicoListComponent },
      // ... mantenha as outras rotas de tecnicos aqui
    ]
  },

  { path: '**', redirectTo: 'login' }
];