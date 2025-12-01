import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';
import { CommonModule } from '@angular/common'; // Importante
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css'],
  imports: [
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    NgFor,
    NgIf
]
})
export class TecnicoListComponent implements OnInit {

    ELEMENT_DATA: Tecnico[] = []

    displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
    dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private service: TecnicoService,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.findAll();
    }

    findAll() {
        this.service.findAll().subscribe(resposta => {
            this.ELEMENT_DATA = resposta
            this.dataSource = new MatTableDataSource<Tecnico>(resposta);
            this.dataSource.paginator = this.paginator;
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}