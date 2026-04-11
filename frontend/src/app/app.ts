import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  tarefas: any[] = [];
  mensagemErro = '';
  apiUrl = 'http://localhost:3000/tarefas'; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (dados) => this.tarefas = dados,
      error: (erro) => console.error('Erro ao buscar tarefas:', erro)
    });
  }

  adicionarTarefa(titulo: string, descricao: string, dataprevista: string, prioridade: string, responsavel: string) {
    this.mensagemErro = ''; 

    if (!titulo || titulo.trim() === '') {
      this.mensagemErro = 'Erro: O título é obrigatório!';
      return;
    }

    if (!descricao || descricao.trim() === '') {
      this.mensagemErro = 'Erro: A descrição da tarefa não pode ser vazia!';
      return;
    }

    // Montamos o objeto igual o seu back-end espera
    const novaTarefa = {
      titulo: titulo,
      descricao: descricao,
      dataprevista: dataprevista || new Date().toISOString().split('T')[0],
      dataentrega: '',
      prioridade: prioridade.replace('Prioridade: ', ''),
      complexidade: 'Média',
      status: 'A Fazer',
      responsavel: responsavel || 'Sem responsável'
    };

    this.http.post(this.apiUrl, novaTarefa).subscribe({
      next: (resposta: any) => {
        // Se o back-end salvou com sucesso, adicionamos na tela
        this.tarefas.push(resposta.tarefa);
      },
      error: (erro) => {
        // Se o back-end barrar (ex: erro de validação), mostramos o erro
        this.mensagemErro = 'Erro do servidor: ' + (erro.error.erro || 'Falha ao salvar');
      }
    });
  }

  atualizarStatus(index: number, novoStatus: string) {
    this.tarefas[index].status = novoStatus;
  }

  deletarTarefa(index: number, titulo: string) {
    this.http.delete(`${this.apiUrl}/${titulo}`).subscribe({
      next: () => {
        // Se deletou com sucesso no back-end, removemos da tela
        this.tarefas.splice(index, 1);
      },
      error: (erro) => {
        this.mensagemErro = 'Erro ao deletar: ' + (erro.error.erro || 'Falha ao deletar');
      }
    });
  }
}