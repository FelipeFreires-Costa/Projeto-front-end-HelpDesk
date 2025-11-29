import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para NgIf, NgFor
import { RouterModule } from '@angular/router'; // Importante para routerLink (botões)
import { FormsModule } from '@angular/forms';

// Imports do Material Design
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Imports de Cliente
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = [];

  // Define as colunas que vão aparecer na tabela
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  
  // Fonte de dados da tabela
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  // Referência ao paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ClienteService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  // Busca todos os clientes no Backend
  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  // Filtro da tabela
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
