class Task {
    constructor(titulo, descricao, dataprevista, dataentrega, prioridade, complexidade, status, responsavel) {
        if (!titulo) {
            throw new Error("O título é obrigatório.");
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
        const statusPermitidos = ['A Fazer', 'Em Progresso', 'Concluído'];
        if (!statusPermitidos.includes(novoStatus)) {
            throw new Error("Status inválido.");
        }
        this.status = novoStatus;
    } 

    atualizarResponsavel(novoResponsavel) {
        this.responsavel = novoResponsavel;
    }
}

module.exports = Task;