import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tecnico-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tecnico-update.html',
  styleUrl: './tecnico-update.css'
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    perfis: []
  };

  constructor(
    private service: TecnicoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id')!;
    this.service.findById(this.tecnico.id).subscribe(res => this.tecnico = res);
  }

  update(): void {
    this.service.update(this.tecnico).subscribe({
      next: () => {
        this.toastr.success('Técnico atualizado com sucesso!');
        this.router.navigate(['/tecnicos']);
      },
      error: () => this.toastr.error('Não foi possível atualizar o técnico')
    });
  }
}
