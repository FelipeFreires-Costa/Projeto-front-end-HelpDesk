import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tecnico-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tecnico-delete.html',
  styleUrl: './tecnico-delete.css'
})
export class TecnicoDeleteComponent implements OnInit {

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
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id')!;
    this.service.findById(this.tecnico.id).subscribe(res => this.tecnico = res);
  }

  delete(): void {
    this.service.delete(this.tecnico.id!).subscribe({
      next: () => {
        this.toastr.success('Técnico deletado com sucesso!');
        this.router.navigate(['/tecnicos']);
      },
      error: () => this.toastr.error('Erro ao deletar técnico')
    });
  }
}
