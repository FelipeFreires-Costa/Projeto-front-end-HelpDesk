import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Credenciais } from '../../models/credenciais';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  creds: Credenciais = {
    email: '',
    senha: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  entrar() {
    console.log('[LOGIN] 1. Iniciando autenticação...');

    this.authService.login(this.creds).subscribe({
      next: (resposta: any) => {
        
        let token: string | null = null;

        // TENTATIVA 1: O token está no cabeçalho (Header)?
        if (resposta.headers && resposta.headers.get) {
           token = resposta.headers.get('Authorization');
           if (token) {
             token = token.replace('Bearer ', '');
           }
        }

        // TENTATIVA 2: O token veio no corpo (Body)?
        if (!token && resposta.body && resposta.body.token) {
           token = resposta.body.token;
        }

        // TENTATIVA 3: A resposta é o token puro?
        if (!token && typeof resposta === 'string' && resposta.length > 10) {
            token = resposta;
        }

        // --- FINALIZA O LOGIN ---
        if (token) {
          localStorage.setItem('token', token);
          console.log('[LOGIN] Sucesso! Token salvo.');
          
          // 🔥 CORREÇÃO AQUI: Mudamos de '/dashboard' para '/tecnicos'
          this.router.navigate(['/home']).then(
             success => {
                if (success) console.log('[LOGIN] Navegação para /tecnicos realizada!');
                else console.warn('[LOGIN] Navegação falhou (verifique se a rota existe).');
             },
             error => console.error('[LOGIN] Erro ao navegar:', error)
          );

        } else {
          this.toastr.error('Erro ao processar login: Token não encontrado.', 'Erro');
        }
      },
      error: (erro: any) => {
        console.error('[LOGIN] Erro:', erro);
        this.toastr.error('Usuário ou senha inválidos.', 'Acesso Negado');
      }
    });
  }
}