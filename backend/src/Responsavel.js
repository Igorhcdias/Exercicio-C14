class Responsavel {
    constructor(nome, email, senha, confirmarsenha) {
        if (senha !== confirmarsenha) {
            throw new Error("As senhas não coincidem!");
        }
        
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

module.exports = Responsavel;