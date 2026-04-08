// src/TaskManager.test.js

// 1. Importamos as classes que vamos testar
const TaskManager = require('./TaskManager');
const Task = require('./Task');

// 'describe' agrupa um conjunto de testes relacionados a algo (neste caso, o TaskManager)
describe('Testes da classe TaskManager', () => {

    let gerenciador;

    // 'beforeEach' roda antes de CADA teste. Usamos para garantir que cada teste novo e vazio
    beforeEach(() => {
        gerenciador = new TaskManager();
    });

    // --- FLUXOS NORMAIS ---

    // 'test' ou 'it' define o que estamos testando
    test('Deve adicionar uma tarefa válida na lista (Fluxo Normal)', () => {
        // Preparação
        const novaTarefa = new Task('Estudar CI/CD', 'Fazer o trabalho', '2023-11-01', '2023-11-10', 'Alta', 'Média', 'A Fazer', 'Fernando Faluxis');
        
        // Ação
        gerenciador.adicionarTask(novaTarefa);
        
        // Verificação (expectativa)
        const lista = gerenciador.listarTasks();
        expect(lista.length).toBe(1); // a ideia é que a lista tenha 1 tarefa
        expect(lista[0].titulo).toBe('Estudar CI/CD'); // a ideia é o titulo ser igual ao que criamos
    });

    // --- FLUXOS INOPORTUNOS (EXCEÇÃO) ---

    test('Deve lançar erro ao tentar adicionar algo que não é uma Task (Fluxo Inoportuno)', () => {
        // gerando dado inválido
        const dadoInvalido = "Não é uma instancia de Task";
        
        // Verificação (expectativa de erro)
        // como estamos usando jest, precisnamos colocar o método dentro de uma função ()  
        expect(() => {
            gerenciador.adicionarTask(dadoInvalido);
        }).toThrow("O objeto precisa ser uma instância da classe Task.");
    });

    test('Deve lançar erro ao tentar deletar uma tarefa que não existe (Fluxo Inoportuno)', () => {
        // tenta deletar de uma lista vazia
        expect(() => {
            gerenciador.deletarTask('Tarefa Fantasma');
        }).toThrow("Tarefa não encontrada para deletar.");
    });

});