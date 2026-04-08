const express = require('express');
const TaskManager = require('./TaskManager'); // ou o nome exato do seu arquivo
const Task = require('./Task');

const app = express();
// Isso permite que nossa API entenda dados no formato JSON (que o front-end vai enviar)
app.use(express.json());

// Criamos o nosso "quadro" de tarefas
const gerenciador = new TaskManager();

// --- ROTAS DA NOSSA API ---

// Rota 1: Listar todas as tarefas
app.get('/tarefas', (req, res) => {
    const lista = gerenciador.listarTasks();
    res.status(200).json(lista);
});

// Rota 2: Adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
    try {
        // Pegamos os dados que o amigo mandou lá do front-end
        const { titulo, descricao, dataprevista, dataentrega, prioridade, complexidade, status, responsavel } = req.body;
        
        // Criamos o objeto Task e adicionamos no gerenciador
        const novaTarefa = new Task(titulo, descricao, dataprevista, dataentrega, prioridade, complexidade, status, responsavel);
        gerenciador.adicionarTask(novaTarefa);

        res.status(201).json({ mensagem: "Tarefa criada com sucesso!", tarefa: novaTarefa });
    } catch (erro) {
        // Se cair nas nossas validações de erro (fluxo inoportuno), avisamos o front-end
        res.status(400).json({ erro: erro.message });
    }
});

// Rota 3: Deletar uma tarefa pelo título
app.delete('/tarefas/:titulo', (req, res) => {
    try {
        const titulo = req.params.titulo;
        gerenciador.deletarTask(titulo);
        res.status(200).json({ mensagem: "Tarefa deletada com sucesso!" });
    } catch (erro) {
        res.status(404).json({ erro: erro.message });
    }
});

// --- LIGANDO O SERVIDOR ---
// O Render define a porta automaticamente, mas no seu PC usaremos a 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
});