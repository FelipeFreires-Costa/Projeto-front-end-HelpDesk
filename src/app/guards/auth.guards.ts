import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  
  const token = localStorage.getItem('token');
  console.log('[GUARD] Verificando token:', token); // Vai mostrar o token salvo

  let logado = this.auth.isAuthenticated();
  console.log('[GUARD] O usuário está autenticado?', logado); // Vai mostrar true ou false

  if (logado) {
    return true;
  } else {
    console.log('[GUARD] Acesso negado! Redirecionando para login...');
    this.router.navigate(['/login']);
    return false;
  }
}
}