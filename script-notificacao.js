const nodemailer = require('nodemailer');

// Lemos as variáveis de ambiente injetadas pelo GitHub Actions
const emailRemetente = process.env.EMAIL_REMETENTE;
const senhaRemetente = process.env.SENHA_REMETENTE;
const emailDestino = process.env.EMAIL_DESTINO;
const statusPipeline = process.env.STATUS_PIPELINE;

console.log("==========================================");
console.log("   SISTEMA DE NOTIFICAÇÃO DO PIPELINE   ");
console.log("==========================================");

// Configuração do "carteiro" (Transportador)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailRemetente,
        pass: senhaRemetente
    }
});

// Configuração do e-mail em si
const mailOptions = {
    from: emailRemetente,
    to: emailDestino,
    subject: `[GitHub Actions] Resultado do Pipeline: ${statusPipeline.toUpperCase()}`,
    text: `Olá!\n\nA execução do seu pipeline de testes e build finalizou com o status: ${statusPipeline.toUpperCase()}.\n\nO pacote foi gerado e o deploy foi processado (se os testes passaram).\n\nParabéns pelo trabalho na disciplina de Engenharia de Software!`
};

// Comando para enviar o e-mail
console.log(`Enviando e-mail de ${emailRemetente} para ${emailDestino}...`);

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('Erro ao enviar e-mail: ', error);
        process.exit(1); // Informa ao GitHub que o job falhou
    } else {
        console.log('E-mail enviado com sucesso! Resposta do servidor: ' + info.response);
    }
});