import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports do Angular Material que vamos usar
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav',
  standalone: true,
  // Adicione todos os módulos aqui
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class NavComponent {
  // Esta variável vai controlar se o menu está aberto ou fechado em telas pequenas
  isSidenavOpen = false;
}