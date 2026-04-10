class Task {
    constructor(titulo, descricao, dataprevista, dataentrega, prioridade, complexidade, status, responsavel) {
        if (!titulo || titulo.trim() === '') {
            throw new Error("O título é obrigatório.");
        }
        if (prioridade !== 'Baixa' && prioridade !== 'Média' && prioridade !== 'Alta') {
            throw new Error('Prioridade inválida. Escolha entre Baixa, Média ou Alta.');
        }
        if (!descricao || descricao.trim() === '') {
            throw new Error('A descrição da tarefa não pode ser vazia.');
        }
        const statusPermitidos = ['A Fazer', 'Em Andamento', 'Concluído'];
        if (!statusPermitidos.includes(status)) {
            throw new Error('Status inválido. Escolha entre A Fazer, Em Andamento ou Concluído.');
        }

        this.titulo = titulo;
        this.descricao = descricao;
        this.dataprevista = dataprevista;
        this.dataentrega = dataentrega;
        this.prioridade = prioridade;
        this.complexidade = complexidade;
        this.status = status; // Ex: 'A Fazer', 'Em Progresso', 'Concluído'
        this.responsavel = responsavel; 
    } 

    atualizarTitulo(novoTitulo) {
        if (!novoTitulo) throw new Error("O título não pode ser vazio.");
        this.titulo = novoTitulo;
    }

    atualizarStatus(novoStatus) {
        const statusPermitidos = ['A Fazer', 'Em Andamento', 'Concluído'];
        if (!statusPermitidos.includes(novoStatus)) {
            throw new Error("Status inválido.");
        }
        this.status = novoStatus;
    } 

    atualizarResponsavel(novoResponsavel) {
        this.responsavel = novoResponsavel;
    }

    
    estaAtrasada(dataAtualStr) {
    if (this.status === 'Concluído') {
        return false;
    }

    const formatoValido = /^\d{4}-\d{2}-\d{2}$/;

    if (!dataAtualStr || !formatoValido.test(dataAtualStr)) {
        throw new Error('Data atual inválida para verificação.');
    }

    const dataTestada = new Date(dataAtualStr);

    if (isNaN(dataTestada.getTime())) {
        throw new Error('Data atual inválida para verificação.');
    }

    const dataPrevista = new Date(this.dataprevista);
    return dataTestada > dataPrevista;
}
}

module.exports = Task;