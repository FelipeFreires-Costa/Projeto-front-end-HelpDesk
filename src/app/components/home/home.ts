import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Imports do Material Design
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,   // Necessário para <mat-card>
    MatIconModule,   // Necessário para <mat-icon>
    MatButtonModule  // Necessário para botões
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent { }