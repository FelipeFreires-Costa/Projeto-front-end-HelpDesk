
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,               // ✔ IMPORTANTE
  imports: [CommonModule, RouterOutlet], // ✔ NECESSÁRIO
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'helpdesk';
}
