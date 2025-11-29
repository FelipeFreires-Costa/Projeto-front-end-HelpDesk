import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Imports do Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

// Imports Específicos de Cliente
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome = new FormControl(null, [Validators.minLength(3)]);
  cpf = new FormControl(null, [Validators.required, Validators.minLength(11)]);
  email = new FormControl(null, [Validators.email]);
  senha = new FormControl(null, [Validators.minLength(3)]);

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.cliente).subscribe({
      next: () => {
        this.toastr.success('Cliente cadastrado com sucesso!', 'Sucesso');
        this.router.navigate(['/clientes']);
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error.message);
        }
      }
    });
  }

  addPerfil(perfil: number): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis = this.cliente.perfis.filter(p => p !== perfil);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}