const Task = require('./Task');

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    adicionarTask(task) {
        if (!(task instanceof Task)) {
            throw new Error("O objeto precisa ser uma instância da classe Task.");
        }
        this.tasks.push(task);
    }

    listarTasks() {
        return this.tasks;
    }

    deletarTask(titulo) {
        const tamanhoInicial = this.tasks.length;
        this.tasks = this.tasks.filter(t => t.titulo !== titulo);

        if (this.tasks.length === tamanhoInicial) {
            throw new Error("Tarefa não encontrada para deletar.");
        }
    }
}

module.exports = TaskManager;