# 🎓 SchoolConnect - Sistema de Gestão Escolar

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Arquitetura do Banco de Dados](#arquitetura-do-banco-de-dados)
6. [Endpoints da API](#endpoints-da-api)
7. [Funcionalidades do Sistema](#funcionalidades-do-sistema)
8. [Perfis de Utilizador](#perfis-de-utilizador)
9. [WebSocket - Comunicação em Tempo Real](#websocket---comunicação-em-tempo-real)
10. [Deployment no Render](#deployment-no-render)
11. [Variáveis de Ambiente](#variáveis-de-ambiente)
12. [Migrações e Baseline](#migrações-e-baseline)
13. [Manutenção e Troubleshooting](#manutenção-e-troubleshooting)

---

## 🏫 Visão Geral

O **SchoolConnect** é uma plataforma escolar digital completa que conecta administradores, professores e encarregados de educação, permitindo:

- 📊 Gestão académica (alunos, turmas, cursos, disciplinas)
- 📝 Lançamento e acompanhamento de notas
- 💬 Comunicação em tempo real via chat WebSocket
- 📅 Agendamento de reuniões (presenciais e online)
- 📢 Publicação de avisos e eventos
- 📈 Relatórios e estatísticas
- 🔐 Autenticação segura com JWT

---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Finalidade |
|------------|--------|-------------|
| Node.js | 22.x | Runtime JavaScript |
| Express.js | 5.x | Framework web |
| Prisma ORM | 7.x | ORM para banco de dados |
| SQLite | 3.x | Banco de dados (via better-sqlite3) |
| JSON Web Token | 9.x | Autenticação |
| Bcrypt | 6.x | Hash de senhas |
| WebSocket (ws) | 8.x | Comunicação em tempo real |
| Multer | 2.x | Upload de ficheiros |
| Helmet | 8.x | Segurança (headers HTTP) |
| CORS | 2.x | Cross-origin resource sharing |
| Express Rate Limit | 7.x | Proteção contra ataques de força bruta |

### Frontend
| Tecnologia | Finalidade |
|------------|-------------|
| TailwindCSS | Framework CSS utilitário |
| Font Awesome | Ícones |
| Google Fonts | Tipografia (Playfair Display, Inter) |
| Fetch API | Requisições HTTP |
| WebSocket API | Comunicação em tempo real |

---

## 📁 Estrutura do Projeto
choolConnect/
├── back-end/
│ ├── bcrypt-jwt/ # Autenticação JWT e hash
│ │ ├── hashSenha.js
│ │ └── jwt.js
│ ├── controller/ # Controladores da API
│ │ ├── _base.js # Helper base para handlers
│ │ ├── controllerAluno.js
│ │ ├── controllerAviso.js
│ │ ├── controllerCurso.js
│ │ ├── controllerDisciplina.js
│ │ ├── controllerEvento.js
│ │ ├── controllerFeedback.js
│ │ ├── controllerMensagem.js
│ │ ├── controllerNota.js
│ │ ├── controllerRelatorio.js
│ │ ├── controllerReuniao.js
│ │ ├── controllerStats.js
│ │ ├── controllerTurma.js
│ │ └── controllersUsuario.js
│ ├── generated/ # Código gerado pelo Prisma
│ │ └── prisma/ # Prisma Client
│ ├── middlewares/ # Middlewares Express
│ │ ├── autenticacao.js
│ │ └── upload.js
│ ├── prisma/ # Schema e migrações
│ │ ├── migrations/ # Migrações SQL
│ │ ├── baseline.sql # Baseline inicial
│ │ └── schema.prisma # Modelo de dados
│ ├── prismaClient/ # Configuração Prisma
│ │ └── prismaClient.js
│ ├── rotas/ # Rotas da API
│ │ ├── rotasAdmin.js
│ │ ├── rotasAluno.js
│ │ ├── rotasAviso.js
│ │ ├── rotasCurso.js
│ │ ├── rotasDisciplina.js
│ │ ├── rotasEvento.js
│ │ ├── rotasFeedback.js
│ │ ├── rotasMensagem.js
│ │ ├── rotasNota.js
│ │ ├── rotasRelatorio.js
│ │ ├── rotasReuniao.js
│ │ ├── rotasStats.js
│ │ ├── rotasTurma.js
│ │ └── rotasUsuario.js
│ ├── service/ # Lógica de negócio
│ │ ├── serviceAluno.js
│ │ ├── serviceAviso.js
│ │ ├── serviceCurso.js
│ │ ├── serviceDisciplina.js
│ │ ├── serviceEvento.js
│ │ ├── serviceFeedback.js
│ │ ├── serviceMensagem.js
│ │ ├── serviceNota.js
│ │ ├── serviceRelatorio.js
│ │ ├── serviceReuniao.js
│ │ ├── serviceStats.js
│ │ ├── ServiceTurma.js
│ │ └── serviceUsuario.js
│ ├── uploads/ # Ficheiros enviados
│ │ ├── arquivos/ # Arquivos gerais (PDFs, imagens)
│ │ └── imagens/ # Imagens de perfil/avisos/eventos
│ ├── .env # Variáveis de ambiente
│ ├── .gitignore
│ ├── .nvmrc # Versão Node.js
│ ├── dev.db # Banco de dados SQLite
│ ├── migrate.js # Script de migração
│ ├── package.json
│ ├── prisma.config.ts # Configuração Prisma
│ ├── servidor.js # Ponto de entrada principal
│ ├── tsconfig.json
│ └── websocket.js # Servidor WebSocket
│
├── front-end/
│ ├── admin.html # Painel Administrador
│ ├── dashboard-encarregado.html # Painel Encarregado
│ ├── dashboard-professor.html # Painel Professor
│ ├── index.html # Página inicial
│ ├── login-admin.html # Login Administrador
│ ├── login.html # Login Utilizadores
│ ├── registro.html # Registo de novos utilizadores
│ └── utils.js # Utilitários comuns (modais, toast)
│
├── img/ # Imagens estáticas
│ ├── background.png
│ ├── logo.png
│ └── x.jpeg
│
├── node_modules/ # Dependências
├── package.json # Dependências raiz (better-sqlite3)
├── package-lock.json
├── render.yaml # Configuração Render.com
└── README.md # Documentação

