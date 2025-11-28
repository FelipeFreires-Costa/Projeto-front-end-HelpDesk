import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credenciais } from '../models/credenciais';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  // 🔥 renomeado para login
login(creds: Credenciais) {
  return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
    observe: 'response',  // <--- ESSA LINHA É OBRIGATÓRIA PARA LER HEADERS
    responseType: 'text'  // <--- Adicione isso se o token for texto puro, evita erro de JSON parse
  });
}

  sucessfulLogin(token: string) {
    const cleanToken = token.replace(/"/g, '');
    localStorage.setItem('token', cleanToken);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }

    return false;
  }
}