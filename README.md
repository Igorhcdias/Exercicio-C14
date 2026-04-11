# 🚀 Gerenciador de Tarefas - Pipeline CI/CD (C14)

Este repositório contém o projeto prático da disciplina **C14 - Engenharia de Software**, ministrada pelo Professor Christopher Lima no Inatel. O foco principal deste projeto é a implementação de um pipeline completo de Integração e Entrega Contínuas (CI/CD).

## 👥 Equipe
* Fernando Faluxis
* Igor Henrique Cauvilla Dias
* João Pedro Moreira de Araújo

## 🛠️ Tecnologias Utilizadas
* **Backend:** Node.js, Express
* **Frontend:** Angular, TypeScript
* **Testes:** Jest (Backend) e Vitest/Karma (Frontend)
* **CI/CD:** GitHub Actions
* **Deploy:** Render
* **Notificações:** Nodemailer

## ⚙️ Estrutura do Pipeline (GitHub Actions)
Nosso arquivo `.yml` executa 4 *jobs* principais de forma otimizada, cumprindo todos os requisitos:
1. **Test (`test`):** Roda os testes unitários e salva o relatório JSON como *artifact*. Roda em paralelo com o build.
2. **Build (`build`):** Empacota a aplicação (`.zip`) e salva como *artifact*. Roda em paralelo com os testes.
3. **Deploy (`deploy`):** Só é executado caso os testes e o build tenham sucesso. Aciona o Webhook do Render de forma segura via *Secrets*.
4. **Notify (`notify`):** Job que roda obrigatoriamente no final. Utiliza um script Node.js com `nodemailer` e *Secrets* para enviar um e-mail com o status final do pipeline para a equipe.

## 🧪 Testes Automatizados
O projeto conta com **28 cenários de testes** automatizados, ultrapassando a meta de 20 exigida.
* **Fluxos Normais:** 11 cenários (Backend + Frontend).
* **Fluxos de Exceção/Inoportunos:** 17 cenários testando falhas de validação, formatação incorreta e regras de negócio.

## 🤖 Declaração de Uso de IA
Durante o desenvolvimento, a equipe utilizou ferramentas de IA Generativa de forma auxiliar, com foco educacional e ganho de produtividade. Os resultados foram altamente satisfatórios.

* **João:**
  Para a implementação da interface e integração com a API, utilizei ferramentas de IA generativa de forma auxiliar. O foco foi agilizar a configuração do ambiente Angular e a resolução de conflitos de dependências no pipeline de CI/CD (GitHub Actions), permitindo maior foco na lógica de negócio e na cobertura de testes unitários.

* **Igor:**
  Utilizei o prompt: *"Atue como um Engenheiro de Software Especialista em Qualidade (QA) e DevOps"*. O uso foi focado na refatoração e validação de regras de negócio para contornar divergências de ambiente no GitHub Actions, na ideação de cenários de testes em Jest (garantindo as coberturas de fluxo normal e exceção exigidas) e no auxílio com comandos do Git via *Conventional Commits*.

* **Fernando:**
  Utilizei o prompt: *"Atue como um Parceiro de Programação. A sua missão é me ajudar com programação com método educativo e passo a passo"*. O foco foi o entendimento prático de Git/GitHub (estratégias de *branching*, *merge*, e *debug* de *pulls* abortados), a correção de erros de escopo no Jest e a implementação passo a passo da integração do `nodemailer` com *Secrets* no script de CI/CD para envio de e-mails reais.

## 🚀 Como executar o projeto localmente
**Backend:**
1. Entre na pasta: `cd backend`
2. Instale as dependências: `npm install`
3. Rode os testes: `npm test`

**Frontend:**
1. Entre na pasta: `cd frontend`
2. Instale as dependências: `npm install`
3. Rode os testes: `npm test` (pressione 'q' para sair do watch mode)