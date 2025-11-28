import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';
import { CommonModule } from '@angular/common';

// 🔥 Angular Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 🔥 Angular Material
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tecnico-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // 🔥 Módulos do Material que o componente usa
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

    tecnico: Tecnico = {
        id:         '',
        nome:       '',
        cpf:        '',
        email:      '',
        senha:      '',
        perfis:     [],
        dataCriacao: ''
    }

    nome: FormControl =  new FormControl(null, Validators.minLength(3));
    cpf: FormControl =       new FormControl(null, Validators.required);
    email: FormControl =        new FormControl(null, Validators.email);
    senha: FormControl = new FormControl(null, Validators.minLength(3));

    constructor(
        private service: TecnicoService,
        private toast:    ToastrService,
        private router:          Router,
    ) { }

    ngOnInit(): void { }

    create(): void {
        this.service.create(this.tecnico).subscribe(() => {
            this.toast.success('Técnico cadastrado com sucesso', 'Cadastro');
            this.router.navigate(['tecnicos'])
        }, ex => {
            if(ex.error.errors) {
            ex.error.errors.forEach((element: { message: string }) => {
            this.toast.error(element.message);
});
            } else {
                this.toast.error(ex.error.message);
            }
        })
    }

    addPerfil(perfil: any): void {
        if(this.tecnico.perfis.includes(perfil)) {
            this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
        } else {
            this.tecnico.perfis.push(perfil);
        }

    }

    validaCampos(): boolean {
        return this.nome.valid && this.cpf.valid
            && this.email.valid && this.senha.valid
    }
}