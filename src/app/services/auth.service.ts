import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  // AQUI ESTAVA O PROBLEMA: Mudei de 'authenticate' para 'login'
  login(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }

  hasPermission(role: string): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    const tokenDecoded = this.jwtService.decodeToken(token);
    
    if(tokenDecoded && tokenDecoded.roles) {
      return tokenDecoded.roles.includes(role);
    }
    return false;
  }
}