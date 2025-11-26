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

  // 🔥 precisa disso, você tinha removido sem querer
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
    console.log("[LOGIN] iniciar entrar()", this.creds);

    this.authService.authenticate(this.creds).subscribe({
      next: (response: any) => {
        console.log("[LOGIN] resposta do /login:", response);

        // backend retorna string pura → remove aspas se vier com elas
        const token = (response as string).replace(/"/g, "");
        localStorage.setItem('token', token);

        console.log("[LOGIN] token salvo no localStorage:", token);

        const ok = this.router.navigate(['/home']);
        console.log("[LOGIN] navigate ->", ok);
      },

      error: (err: any) => {
        console.error("[LOGIN] erro:", err);
        this.toastr.error("Usuário ou senha inválidos", "Erro");
      }
    });
  }
}
