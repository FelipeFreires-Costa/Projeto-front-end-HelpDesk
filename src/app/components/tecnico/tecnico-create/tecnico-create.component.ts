import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tecnico-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tecnico-create.html',
  styleUrl: './tecnico-create.css'
})
export class TecnicoCreateComponent {
  
  tecnico: Tecnico = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    perfis: []
  };

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  create(): void {
    this.service.create(this.tecnico).subscribe({
      next: () => {
        this.toastr.success('Técnico criado com sucesso!');
        this.router.navigate(['/tecnicos']);
      },
      error: () => this.toastr.error('Erro ao criar técnico')
    });
  }
}
