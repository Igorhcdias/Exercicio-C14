import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { App } from './app';

describe('Testes do Componente Principal (Front-end)', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    // Configura o ambiente de testes do Angular, importando o "dublê" de HTTP
    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges(); 
    const req = httpMock.expectOne('http://localhost:3000/tarefas');
    req.flush([]); 
  });

  afterEach(() => {
    httpMock.verify();
  });

  // TESTES DE FLUXO NORMAL 
  describe('Fluxos Normais', () => {

    it('1. Deve adicionar uma tarefa com sucesso comunicando com o Back-end', () => {

      component.adicionarTarefa('Criar Testes', 'Fazer os 6 testes pedidos', '2026-04-15', 'Alta', 'João');

      // Interceptamos o POST que foi pro back-end
      const req = httpMock.expectOne('http://localhost:3000/tarefas');
      expect(req.request.method).toBe('POST'); // Garante que o método foi POST

      // Simulamos a resposta de SUCESSO do nosso back-end
      req.flush({
        mensagem: "Tarefa criada com sucesso!",
        tarefa: { titulo: 'Criar Testes', descricao: 'Fazer os 6 testes pedidos', status: 'A Fazer' }
      });

      // Verificação: A tarefa tem que ter entrado na lista da tela e não pode ter erro
      expect(component.tarefas.length).toBe(1);
      expect(component.tarefas[0].titulo).toBe('Criar Testes');
      expect(component.mensagemErro).toBe('');
    });

    it('2. Deve deletar uma tarefa com sucesso no Back-end', () => {
      // Preparação: Colocamos uma tarefa fictícia na tela
      component.tarefas = [{ titulo: 'Tarefa Chata' }];

      // Ação: O usuário clica em deletar
      component.deletarTarefa(0, 'Tarefa Chata');

      // Interceptamos o DELETE
      const req = httpMock.expectOne('http://localhost:3000/tarefas/Tarefa Chata');
      expect(req.request.method).toBe('DELETE');

      // Simulamos que o back-end deletou com sucesso
      req.flush({ mensagem: "Tarefa deletada com sucesso!" });

      // Verificação: A lista na tela tem que ficar vazia
      expect(component.tarefas.length).toBe(0);
    });

    it('3. Deve atualizar o status de uma tarefa na tela', () => {
      // Preparação
      component.tarefas = [{ titulo: 'Bug Fix', status: 'A Fazer' }];

      // Ação: Atualiza o status do primeiro item (index 0) para Concluído
      component.atualizarStatus(0, 'Concluído');

      // Verificação
      expect(component.tarefas[0].status).toBe('Concluído');
    });

  });

 
  //  TESTES DE FLUXO INOPORTUNO 
  describe('Fluxos Inoportunos (Exceções)', () => {

    it('1. Deve bloquear a criação de tarefa se o título estiver vazio', () => {
      // Ação: Tenta criar sem título
      component.adicionarTarefa('', 'Descrição válida', '2026-04-15', 'Baixa', 'João');

      // Verificação: Tem que gerar mensagem de erro na tela
      expect(component.mensagemErro).toBe('Erro: O título é obrigatório!');
      
      // Verificação: Garante que NENHUMA requisição foi enviada pro back-end
      httpMock.expectNone('http://localhost:3000/tarefas'); 
    });

    it('2. Deve bloquear a criação de tarefa se a descrição estiver vazia', () => {
      // Ação: Tenta criar com título, mas sem descrição
      component.adicionarTarefa('Título Válido', '', '2026-04-15', 'Baixa', 'João');

      // Verificação
      expect(component.mensagemErro).toBe('Erro: A descrição da tarefa não pode ser vazia!');
      httpMock.expectNone('http://localhost:3000/tarefas'); 
    });

    it('3. Deve exibir mensagem de erro na tela se o Back-end recusar a tarefa', () => {
      // Ação: Envia dados, mas vamos simular que o back-end deu crash
      component.adicionarTarefa('Comprar pão', 'Ir na padaria', '2026-04-15', 'Média', 'João');

      const req = httpMock.expectOne('http://localhost:3000/tarefas');

      // Simulamos que o back-end retornou um ERRO 400 (Bad Request)
      req.flush(
        { erro: "Data inválida ou servidor fora do ar" }, // Corpo do erro
        { status: 400, statusText: 'Bad Request' }        // Cabeçalhos HTTP
      );

      // Verificação: O front-end tem que ter pego a mensagem do back-end e mostrado na tela
      expect(component.mensagemErro).toContain('Erro do servidor: Data inválida ou servidor fora do ar');
      expect(component.tarefas.length).toBe(0); // Garante que a tarefa não entrou na tela
    });

  });
});