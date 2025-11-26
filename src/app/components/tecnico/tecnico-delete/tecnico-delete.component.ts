import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';

@Component({
  selector: 'app-tecnico-delete',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tecnico-delete.html',
  styleUrls: ['./tecnico-delete.css']
})
export class TecnicoDeleteComponent {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: ''
  };

  constructor(
    private service: TecnicoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.service.findById(id).subscribe({
        next: (res) => this.tecnico = res,
        error: () => alert('Erro ao carregar o técnico')
      });
    }
  }

  delete(): void {
    if (!this.tecnico.id) return;

    this.service.delete(this.tecnico.id).subscribe({
      next: () => {
        alert('Técnico deletado com sucesso!');
        this.router.navigate(['tecnicos']);
      },
      error: () => alert('Erro ao deletar!')
    });
  }

  cancel(): void {
    this.router.navigate(['tecnicos']);
  }
}
