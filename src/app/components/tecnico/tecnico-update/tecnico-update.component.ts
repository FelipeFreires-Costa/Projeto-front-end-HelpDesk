import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tecnico-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tecnico-update.html',
  styleUrls: ['./tecnico-update.css']
})
export class TecnicoUpdateComponent {

  form: FormGroup;
update(): void {
  if (this.form.valid) {
    console.log("Dados enviados:", this.form.value);
    // depois colocamos a chamada pro service
  } else {
    console.warn("Formulário inválido!");
  }
}
  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [''],
      nome: [''],
      cpf: [''],
      email: ['']
    });
  }
}
