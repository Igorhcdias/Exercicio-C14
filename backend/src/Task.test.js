const Task = require('./Task'); // Importa a classe que vamos testar

describe('Testes da classe Task (Responsabilidade do Fernando)', () => {

    // 1. FLUXO NORMAL: Criação perfeita
    test('Deve criar uma tarefa válida com todos os campos (Fluxo Normal)', () => {
        // Arrange & Act (Preparar e Agir)
        const tarefa = new Task('Estudar Jest', 'Estudar os comportamentos e características do Jest', '2023-11-01', '2023-11-10', 'Alta', 'Média', 'A Fazer', 'Fernando');
        
        // Assert (Verificar)
        expect(tarefa.titulo).toBe('Estudar Jest');
        expect(tarefa.prioridade).toBe('Alta');
        expect(tarefa.status).toBe('A Fazer');
        expect(tarefa.responsavel).toBe('Fernando');
    });

    // 2. ESPIRITO DE PORCO: Título vazio
    test('Deve lançar erro ao tentar criar tarefa com título vazio (ESPIRITO DE PORCO)', () => {
        expect(() => {
            // Título passado como string vazia ''
            new Task('', 'Estudar os comportamentos e características do Jest', '2023-11-01', '2023-11-10', 'Alta', 'Média', 'A Fazer', 'Fernando');
        }).toThrow('O título é obrigatório.'); 
    });

    // 3. ESPIRITO DE PORCO: Descrição vazia
    test('Deve lançar erro ao tentar criar tarefa com descrição vazia (ESPIRITO DE PORCO)', () => {
        expect(() => {
            // Descrição passada como string vazia ''
            new Task('Estudar Jest', '', '2023-11-01', '2023-11-10', 'Alta', 'Média', 'A Fazer', 'Fernando');
        }).toThrow('A descrição da tarefa não pode ser vazia.');
    });

    // 4. ESPIRITO DE PORCO: Prioridade inventada
    test('Deve lançar erro se a prioridade não for Baixa, Média ou Alta (ESPIRITO DE PORCO)', () => {
        expect(() => {
            // Prioridade passada como 'Urgente' (que não existe nas nossas regras)
            new Task('Estudar Jest', 'Estudar os comportamentos e características do Jest', '2023-11-01', '2023-11-10', 'Urgente', 'Média', 'A Fazer', 'Fernando');
        }).toThrow('Prioridade inválida. Escolha entre Baixa, Média ou Alta.');
    });

    // 5. ESPIRITO DE PORCO: Status inválido
    test('Deve lançar erro se o status for diferente dos permitidos (ESPIRITO DE PORCO)', () => {
        expect(() => {
            // Status passado como 'Terminado' (supondo que o correto seja 'Concluído' ou 'A Fazer')
            new Task('Estudar Jest', 'Fazer testes', '2023-11-01', '2023-11-10', 'Alta', 'Média', 'Terminado', 'Fernando');
        }).toThrow('Status inválido. Escolha entre A Fazer, Em Andamento ou Concluído.');
    });

});