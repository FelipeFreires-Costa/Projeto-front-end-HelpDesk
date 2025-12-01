import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chamado-read',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  constructor(
    private chamadoService: ChamadoService,
    private toast: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Pega o ID que veio na URL (ex: chamados/read/1)
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe({
      next: (resposta) => {
        this.chamado = resposta;
        // Aqui não precisamos converter para string para Selects, 
        // pois vamos usar métodos auxiliares para mostrar o Texto no Input
      },
      error: (ex) => {
        this.toast.error(ex.error.error || 'Erro ao carregar chamado');
      }
    });
  }

  // Método para transformar "0", "1", "2" em Texto para exibir na tela
  retornaStatus(status: any): string {
    if(status == '0') return 'ABERTO';
    if(status == '1') return 'EM ANDAMENTO';
    return 'ENCERRADO';
  }

  // Método para transformar prioridade em Texto
  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') return 'BAIXA';
    if(prioridade == '1') return 'MÉDIA';
    return 'ALTA';
  }
}