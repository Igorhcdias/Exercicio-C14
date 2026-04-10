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

    test('Deve retornar true se a data atual for maior que a data prevista', () => {
        // Tarefa com previsão para o dia 10 de abril
        const tarefa = new Task('Entregar Código', 'Fazer o push da feature', '2026-04-10', '', 'Alta', 'Alta', 'Em Andamento', 'Igor');
        
        // Simulando que hoje é dia 12 de abril (passou do prazo)
        expect(tarefa.estaAtrasada('2026-04-12')).toBe(true);

    });

    test('Deve retornar false se a data atual for menor ou igual à data prevista', () => {
        // Tarefa com previsão para o dia 20 de abril
        const tarefa = new Task('Apresentar Pitch', 'Slides para o evento no Inatel', '2026-04-20', '', 'Média', 'Baixa', 'A Fazer', 'Igor');
        
        // Simulando que hoje é dia 15 de abril (ainda tem tempo)
        expect(tarefa.estaAtrasada('2026-04-15')).toBe(false); 
        
        // Simulando que hoje é o último dia do prazo
        expect(tarefa.estaAtrasada('2026-04-20')).toBe(false); 
    });

    test('Deve retornar false se a tarefa estiver atrasada, mas já foi com status Concluído', () => {
        // Tarefa que era para o dia 05, mas o status está como 'Concluído'
        const tarefa = new Task('Checklist JS', 'Terminar script', '2026-04-05', '2026-04-06', 'Alta', 'Alta', 'Concluído', 'Igor');
        
        // Simulando o dia 10 (passou do prazo original, mas já foi entregue)
        expect(tarefa.estaAtrasada('2026-04-10')).toBe(false);
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

    test('Deve lançar erro ao verificar atraso sem passar a data atual', () => {
        const tarefa = new Task('Bugfix', 'Corrigir erro', '2026-04-10', '', 'Baixa', 'Baixa', 'A Fazer', 'Igor');
        
        // Chamando o método vazio
        expect(() => { tarefa.estaAtrasada() }).toThrow('Data atual inválida para verificação.');
    });

    test('Deve lançar erro ao tentar atualizar o título para um valor vazio', () => {
    // Criamos a tarefa normalmente
    const tarefa = new Task('Revisão', 'Revisar PR', '2026-04-10', '', 'Média', 'Média', 'A Fazer', 'Lara');
    
    // Tentamos forçar a atualização para uma string vazia
    expect(() => { 
        tarefa.atualizarTitulo(''); 
    }).toThrow("O título não pode ser vazio.");
});
});