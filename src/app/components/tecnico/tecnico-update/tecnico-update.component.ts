import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  standalone: true,
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.tecnico.id = idParam ?? '';

    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe({
      next: (resposta: Tecnico) => {
        this.tecnico = {
          ...resposta,
          perfis: Array.isArray(resposta.perfis)
            ? resposta.perfis.map(p => Number(p))
            : []
        };
      },
      error: () => {
        this.toast.error('Erro ao carregar técnico');
      }
    });
  }

  update(): void {
    const tecnicoParaEnviar: Tecnico = {
      ...this.tecnico,
      perfis: [...this.tecnico.perfis] // garante number[]
    };

    this.service.update(tecnicoParaEnviar).subscribe({
      next: () => {
        this.toast.success('Técnico atualizado com sucesso', 'Update');
        this.router.navigate(['tecnicos']);
      },

      error: (ex) => {
        if (ex.error?.errors) {
          ex.error.errors.forEach((err: { message: string }) => {
            this.toast.error(err.message);
          });

        } else {
          this.toast.error(ex.error?.message || 'Erro ao atualizar técnico');
        }
      }
    });
  }

  addPerfil(perfil: number | string): void {
    const p = Number(perfil);

    if (!this.tecnico.perfis) {
      this.tecnico.perfis = [];
    }

    if (this.tecnico.perfis.includes(p)) {
      this.tecnico.perfis = this.tecnico.perfis.filter(x => x !== p);
    } else {
      this.tecnico.perfis.push(p);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.senha.valid
    );
  }
}
