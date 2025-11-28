export interface Tecnico {
  id?: any;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  perfis: any[]; // <--- aceita número ou string
  dataCriacao: string;
}