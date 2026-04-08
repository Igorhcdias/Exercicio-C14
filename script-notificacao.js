// script-notificacao.js

// Lemos as variáveis de ambiente que o GitHub Actions vai injetar
const emailDestino = process.env.EMAIL_DESTINO;
const statusPipeline = process.env.STATUS_PIPELINE;

console.log("==========================================");
console.log("   SISTEMA DE NOTIFICAÇÃO DO PIPELINE   ");
console.log("==========================================");

if (!emailDestino) {
    console.log("Aviso: E-mail não configurado nas Secrets. Simulando envio...");
} else {
    console.log(`Preparando envio de e-mail para: ${emailDestino}`);
}

console.log(`Assunto: Resultado da Integração Contínua (CI/CD)`);
console.log(`Corpo da mensagem: Olá! O seu pipeline de testes e build finalizou com o status: ${statusPipeline.toUpperCase()}`);

// Em um sistema real, aqui usariamos a biblioteca 'nodemailer' para despachar o e-mail de verdade.
// Para o escopo do trabalho, demonstrar a leitura segura da variável de ambiente é o principal.
console.log("Notificação processada com sucesso!");