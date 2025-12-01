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
    console.log('[LOGIN] 1. Enviando credenciais...', this.creds);

    this.authService.login(this.creds).subscribe({
      next: (resposta: any) => {
        console.log('[LOGIN] 2. Resposta recebida do servidor.');
        
        // DEBUG: Vamos ver quais headers chegaram
        // Nota: As vezes os headers aparecem vazios no console do navegador por segurança, mas o código lê.
        console.log('[LOGIN] Headers disponíveis:', resposta.headers.keys());

        // O Java manda no header 'Authorization'
        let token = resposta.headers.get('Authorization');

        if (token) {
          console.log('[LOGIN] 3. Token encontrado no Header!');
          
          // Limpa o prefixo para salvar só o HASH
          token = token.replace('Bearer ', '');
          
          localStorage.setItem('token', token);
          console.log('[LOGIN] 4. Token salvo no LocalStorage (sem Bearer).');

          this.router.navigate(['/home']);
        } else {
          console.error('[LOGIN] ERRO: O Header "Authorization" não veio ou o JS não conseguiu ler.');
          this.toastr.error('Erro de comunicação: Token não recebido.');
        }
      },
      error: (ex) => {
        console.error('[LOGIN] Erro ao logar:', ex);
        this.toastr.error('Usuário ou senha inválidos');
      }
    });
  }
}