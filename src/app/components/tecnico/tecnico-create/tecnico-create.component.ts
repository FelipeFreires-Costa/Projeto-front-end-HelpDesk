import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tecnico-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tecnico-create.html',
  styleUrls: ['./tecnico-create.css']
})
export class TecnicoCreateComponent {

  // declare sem inicializar
  form!: FormGroup;

  // injeta o FormBuilder
  constructor(private fb: FormBuilder) {
    // inicializa o form dentro do construtor (depois que fb existe)
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [''] // se precisar de senha no create
    });
  }

  create() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log("📌 Dados enviados:", this.form.value);
    // aqui você chamaria o service: this.tecnicoService.create(this.form.value).subscribe(...)
  }
}
