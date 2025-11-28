import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

// Imports do Material Design para o Menu Lateral
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-nav',
  standalone: true,
  // 🔥 Adicionando todos os componentes visuais que o menu usa
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet, // Necessário para carregar a Home dentro da Nav
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './nav.html',
styleUrl: './nav.css'

})
export class NavComponent { }
