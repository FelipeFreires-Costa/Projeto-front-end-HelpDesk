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
  styleUrl: './login.css'
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
    this.authService.authenticate(this.creds).subscribe({
      next: (response) => {
        this.authService.sucessfulLogin(response);
        this.toastr.success('Login realizado com sucesso!', 'Bem-vindo');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error('Usuário ou senha inválidos', 'Erro no login');
      }
    });
  }
}
