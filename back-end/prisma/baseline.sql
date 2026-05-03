-- Baseline: marca todas as migrações existentes como já aplicadas
-- Corre apenas se a tabela _prisma_migrations ainda não existir

CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
  "id"                    TEXT PRIMARY KEY NOT NULL,
  "checksum"              TEXT NOT NULL,
  "finished_at"           DATETIME,
  "migration_name"        TEXT NOT NULL,
  "logs"                  TEXT,
  "rolled_back_at"        DATETIME,
  "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
  "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO "_prisma_migrations" ("id","checksum","finished_at","migration_name","logs","rolled_back_at","started_at","applied_steps_count") VALUES
  ('1','baseline','2026-01-01 00:00:00','20260318123612_add_nota',NULL,NULL,'2026-01-01 00:00:00',1),
  ('2','baseline','2026-01-01 00:00:00','20260319095606_add_telefone_to_usuario',NULL,NULL,'2026-01-01 00:00:00',1),
  ('3','baseline','2026-01-01 00:00:00','20260319130239_add_telefone_to_aluno',NULL,NULL,'2026-01-01 00:00:00',1),
  ('4','baseline','2026-01-01 00:00:00','20260404003251_add_usuario_imagem_relacao_codigo',NULL,NULL,'2026-01-01 00:00:00',1),
  ('5','baseline','2026-01-01 00:00:00','20260404011136_add_editado_em_to_mensagem',NULL,NULL,'2026-01-01 00:00:00',1),
  ('6','baseline','2026-01-01 00:00:00','20260404221804_add_feedback',NULL,NULL,'2026-01-01 00:00:00',1),
  ('7','baseline','2026-01-01 00:00:00','20260404230205_add_deletado_fields_to_mensagem',NULL,NULL,'2026-01-01 00:00:00',1),
  ('8','baseline','2026-01-01 00:00:00','20260405002138_add_mensagem_arquivo',NULL,NULL,'2026-01-01 00:00:00',1),
  ('9','baseline','2026-01-01 00:00:00','20260410192103_add_professor_cursos_relation',NULL,NULL,'2026-01-01 00:00:00',1);