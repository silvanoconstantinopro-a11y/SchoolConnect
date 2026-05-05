-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "imagem" TEXT,
    "relacaoEducando" TEXT,
    "codigoVerificacao" TEXT,
    "ultimoLogin" DATETIME,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "imagem" TEXT,
    "classe" TEXT NOT NULL,
    "dataNascimento" DATETIME,
    "endereco" TEXT,
    "turmaId" INTEGER NOT NULL,
    "encarregadoId" INTEGER,
    "cursoId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "alunos_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "alunos_encarregadoId_fkey" FOREIGN KEY ("encarregadoId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "alunos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "turmas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "ano" INTEGER NOT NULL DEFAULT 2026,
    "semestre" INTEGER,
    "capacidade" INTEGER,
    "turno" TEXT,
    "professorId" INTEGER,
    "cursoId" INTEGER,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "turmas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "turmas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "cargaHoraria" INTEGER,
    "duracaoMeses" INTEGER,
    "nivel" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "disciplinas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "codigo" TEXT,
    "descricao" TEXT NOT NULL,
    "cargaHoraria" INTEGER,
    "semestre" INTEGER,
    "cursoId" INTEGER NOT NULL,
    "professorId" INTEGER,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "disciplinas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "disciplinas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" REAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "semestre" INTEGER NOT NULL DEFAULT 2026,
    "observacao" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "notas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notas_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "mensagens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conteudo" TEXT NOT NULL,
    "remetenteId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "lidaEm" DATETIME,
    "editadoEm" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "deletadoParaRemetente" BOOLEAN NOT NULL DEFAULT false,
    "deletadoParaDestinatario" BOOLEAN NOT NULL DEFAULT false,
    "arquivoUrl" TEXT,
    "arquivoNome" TEXT,
    "arquivoTipo" TEXT,
    "arquivoTamanho" INTEGER,
    CONSTRAINT "mensagens_remetenteId_fkey" FOREIGN KEY ("remetenteId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "mensagens_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "avisos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "imagem" TEXT,
    "categoria" TEXT NOT NULL DEFAULT 'geral',
    "autorId" INTEGER,
    "autorNome" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT,
    "dataEvento" DATETIME,
    "dataFim" DATETIME,
    "local" TEXT,
    "organizador" TEXT,
    "maxParticipantes" INTEGER,
    "categoria" TEXT NOT NULL DEFAULT 'geral',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "reunioes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "local" TEXT NOT NULL,
    "linkMeeting" TEXT,
    "dataHora" DATETIME,
    "criadoPorId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'AGENDADA',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "reunioes_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "reuniao_participantes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reuniaoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "confirmadoEm" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reuniao_participantes_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "reunioes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reuniao_participantes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "relatorios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'geral',
    "autorId" INTEGER,
    "dataReferencia" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "avaliacao" INTEGER,
    "categoria" TEXT NOT NULL DEFAULT 'geral',
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "resposta" TEXT,
    "respondidoEm" DATETIME,
    "usuarioId" INTEGER,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "feedbacks_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "codigos_professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "professorId" INTEGER,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "codigos_professor_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProfessorCursos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProfessorCursos_A_fkey" FOREIGN KEY ("A") REFERENCES "cursos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfessorCursos_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DisciplinaToTurma" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DisciplinaToTurma_A_fkey" FOREIGN KEY ("A") REFERENCES "disciplinas" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DisciplinaToTurma_B_fkey" FOREIGN KEY ("B") REFERENCES "turmas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_telefone_key" ON "usuarios"("telefone");

-- CreateIndex
CREATE INDEX "usuarios_email_idx" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_perfil_idx" ON "usuarios"("perfil");

-- CreateIndex
CREATE INDEX "usuarios_ativo_idx" ON "usuarios"("ativo");

-- CreateIndex
CREATE UNIQUE INDEX "alunos_matricula_key" ON "alunos"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "alunos_telefone_key" ON "alunos"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "alunos_email_key" ON "alunos"("email");

-- CreateIndex
CREATE INDEX "alunos_matricula_idx" ON "alunos"("matricula");

-- CreateIndex
CREATE INDEX "alunos_turmaId_idx" ON "alunos"("turmaId");

-- CreateIndex
CREATE INDEX "alunos_cursoId_idx" ON "alunos"("cursoId");

-- CreateIndex
CREATE INDEX "alunos_encarregadoId_idx" ON "alunos"("encarregadoId");

-- CreateIndex
CREATE INDEX "turmas_professorId_idx" ON "turmas"("professorId");

-- CreateIndex
CREATE INDEX "turmas_cursoId_idx" ON "turmas"("cursoId");

-- CreateIndex
CREATE INDEX "turmas_ano_idx" ON "turmas"("ano");

-- CreateIndex
CREATE UNIQUE INDEX "turmas_nome_ano_key" ON "turmas"("nome", "ano");

-- CreateIndex
CREATE UNIQUE INDEX "cursos_nome_key" ON "cursos"("nome");

-- CreateIndex
CREATE INDEX "cursos_nome_idx" ON "cursos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "disciplinas_codigo_key" ON "disciplinas"("codigo");

-- CreateIndex
CREATE INDEX "disciplinas_cursoId_idx" ON "disciplinas"("cursoId");

-- CreateIndex
CREATE INDEX "disciplinas_professorId_idx" ON "disciplinas"("professorId");

-- CreateIndex
CREATE UNIQUE INDEX "disciplinas_nome_cursoId_key" ON "disciplinas"("nome", "cursoId");

-- CreateIndex
CREATE INDEX "notas_alunoId_idx" ON "notas"("alunoId");

-- CreateIndex
CREATE INDEX "notas_disciplinaId_idx" ON "notas"("disciplinaId");

-- CreateIndex
CREATE INDEX "notas_semestre_idx" ON "notas"("semestre");

-- CreateIndex
CREATE UNIQUE INDEX "notas_alunoId_disciplinaId_tipo_semestre_key" ON "notas"("alunoId", "disciplinaId", "tipo", "semestre");

-- CreateIndex
CREATE INDEX "mensagens_remetenteId_idx" ON "mensagens"("remetenteId");

-- CreateIndex
CREATE INDEX "mensagens_destinatarioId_idx" ON "mensagens"("destinatarioId");

-- CreateIndex
CREATE INDEX "mensagens_criadoEm_idx" ON "mensagens"("criadoEm");

-- CreateIndex
CREATE INDEX "avisos_criadoEm_idx" ON "avisos"("criadoEm");

-- CreateIndex
CREATE INDEX "avisos_categoria_idx" ON "avisos"("categoria");

-- CreateIndex
CREATE INDEX "eventos_dataEvento_idx" ON "eventos"("dataEvento");

-- CreateIndex
CREATE INDEX "eventos_categoria_idx" ON "eventos"("categoria");

-- CreateIndex
CREATE INDEX "reunioes_dataHora_idx" ON "reunioes"("dataHora");

-- CreateIndex
CREATE INDEX "reunioes_status_idx" ON "reunioes"("status");

-- CreateIndex
CREATE INDEX "reuniao_participantes_reuniaoId_idx" ON "reuniao_participantes"("reuniaoId");

-- CreateIndex
CREATE INDEX "reuniao_participantes_usuarioId_idx" ON "reuniao_participantes"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "reuniao_participantes_reuniaoId_usuarioId_key" ON "reuniao_participantes"("reuniaoId", "usuarioId");

-- CreateIndex
CREATE INDEX "relatorios_tipo_idx" ON "relatorios"("tipo");

-- CreateIndex
CREATE INDEX "relatorios_criadoEm_idx" ON "relatorios"("criadoEm");

-- CreateIndex
CREATE INDEX "feedbacks_status_idx" ON "feedbacks"("status");

-- CreateIndex
CREATE INDEX "feedbacks_criadoEm_idx" ON "feedbacks"("criadoEm");

-- CreateIndex
CREATE INDEX "feedbacks_email_idx" ON "feedbacks"("email");

-- CreateIndex
CREATE UNIQUE INDEX "codigos_professor_codigo_key" ON "codigos_professor"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "codigos_professor_professorId_key" ON "codigos_professor"("professorId");

-- CreateIndex
CREATE INDEX "codigos_professor_codigo_idx" ON "codigos_professor"("codigo");

-- CreateIndex
CREATE INDEX "codigos_professor_usado_idx" ON "codigos_professor"("usado");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessorCursos_AB_unique" ON "_ProfessorCursos"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessorCursos_B_index" ON "_ProfessorCursos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DisciplinaToTurma_AB_unique" ON "_DisciplinaToTurma"("A", "B");

-- CreateIndex
CREATE INDEX "_DisciplinaToTurma_B_index" ON "_DisciplinaToTurma"("B");
