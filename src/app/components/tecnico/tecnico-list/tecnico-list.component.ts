import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tecnico-list.html',
  styleUrl: './tecnico-list.css'
})
export class TecnicoListComponent implements OnInit {

  tecnicos: Tecnico[] = [];

  constructor(
    private service: TecnicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.findAll().subscribe(res => this.tecnicos = res);
  }

  navigateToCreate(): void {
    this.router.navigate(['/tecnicos/create']);
  }
}
