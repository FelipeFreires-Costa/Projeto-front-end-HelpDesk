export interface Cliente {
  id?: any;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  perfis: any[]; // <--- aceita número (id do perfil) ou string
  dataCriacao: any;
}