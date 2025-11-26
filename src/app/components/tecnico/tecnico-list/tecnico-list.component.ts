import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tecnico-list.html',
  styleUrl: './tecnico-list.css'
})
export class TecnicoListComponent {

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource: Tecnico[] = [];

  constructor(private service: TecnicoService) {}

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe({
      next: (res) => {
        this.dataSource = res;
        console.log('[LIST] Técnicos carregados:', res);
      },
      error: (err) => {
        console.error('[LIST] Erro ao carregar técnicos:', err);
        
      }
    });
  }
}
