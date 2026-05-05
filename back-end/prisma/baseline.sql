-- =====================================================
-- BASELINE SQL - SchoolConnect
-- Marca todas as migrações existentes como já aplicadas
-- Executa apenas se a tabela _prisma_migrations não existir
-- =====================================================

-- =====================================================
-- 1. CRIAÇÃO DA TABELA DE MIGRAÇÕES
-- =====================================================

CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
  "id"                    TEXT PRIMARY KEY NOT NULL,
  "checksum"              TEXT NOT NULL,
  "finished_at"           DATETIME,
  "migration_name"        TEXT NOT NULL,
  "logs"                  TEXT,
  "rolled_back_at"        DATETIME,
  "started_at"            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);

-- =====================================================
-- 2. FUNÇÃO PARA GERAR IDS ÚNICOS
-- =====================================================

-- Função para gerar UUID v4 (se não existir)
CREATE TEMP TABLE IF NOT EXISTS temp_uuid (id TEXT);
INSERT OR IGNORE INTO temp_uuid (id) VALUES (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' || substr(hex(randomblob(2)),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(hex(randomblob(2)),2) || '-' || hex(randomblob(6))));

-- =====================================================
-- 3. INSERÇÃO DAS MIGRAÇÕES EXISTENTES
-- =====================================================

-- Função para gerar checksum (simplificada)
-- Em produção, isso seria um hash real das migrações
WITH migration_data (id, checksum, migration_name, started_at) AS (
  SELECT 
    '1', 
    'baseline_migration_001',
    '20260318123612_add_nota',
    datetime('now', '-9 days')
  UNION ALL
  SELECT 
    '2', 
    'baseline_migration_002', 
    '20260319095606_add_telefone_to_usuario',
    datetime('now', '-8 days')
  UNION ALL
  SELECT 
    '3', 
    'baseline_migration_003', 
    '20260319130239_add_telefone_to_aluno',
    datetime('now', '-7 days')
  UNION ALL
  SELECT 
    '4', 
    'baseline_migration_004', 
    '20260404003251_add_usuario_imagem_relacao_codigo',
    datetime('now', '-6 days')
  UNION ALL
  SELECT 
    '5', 
    'baseline_migration_005', 
    '20260404011136_add_editado_em_to_mensagem',
    datetime('now', '-5 days')
  UNION ALL
  SELECT 
    '6', 
    'baseline_migration_006', 
    '20260404221804_add_feedback',
    datetime('now', '-4 days')
  UNION ALL
  SELECT 
    '7', 
    'baseline_migration_007', 
    '20260404230205_add_deletado_fields_to_mensagem',
    datetime('now', '-3 days')
  UNION ALL
  SELECT 
    '8', 
    'baseline_migration_008', 
    '20260405002138_add_mensagem_arquivo',
    datetime('now', '-2 days')
  UNION ALL
  SELECT 
    '9', 
    'baseline_migration_009', 
    '20260410192103_add_professor_cursos_relation',
    datetime('now', '-1 days')
)

INSERT OR IGNORE INTO "_prisma_migrations" (
  "id", 
  "checksum", 
  "finished_at", 
  "migration_name", 
  "logs", 
  "rolled_back_at", 
  "started_at", 
  "applied_steps_count"
)
SELECT 
  id,
  checksum,
  datetime('now') as finished_at,
  migration_name,
  NULL as logs,
  NULL as rolled_back_at,
  started_at,
  1 as applied_steps_count
FROM migration_data;

-- =====================================================
-- 4. VERIFICAÇÃO PÓS-INSERÇÃO
-- =====================================================

-- Verificar se as migrações foram inseridas corretamente
SELECT 
  '✅ Baseline aplicado com sucesso!' as status,
  COUNT(*) as total_migrations
FROM "_prisma_migrations";

-- Mostrar detalhes das migrações aplicadas
SELECT 
  migration_name,
  datetime(finished_at) as applied_at,
  CASE 
    WHEN finished_at IS NOT NULL THEN 'APPLIED'
    ELSE 'PENDING'
  END as status
FROM "_prisma_migrations"
ORDER BY started_at DESC;

-- =====================================================
-- 5. LIMPEZA DE OBJETOS TEMPORÁRIOS
-- =====================================================

-- Remover tabela temporária
DROP TABLE IF EXISTS temp_uuid;

-- =====================================================
-- 6. DIAGNÓSTICO (opcional)
-- =====================================================

-- Exibir informações do banco de dados
SELECT 
  'Database Info' as info,
  filepath as database_path,
  page_count * page_size as total_bytes,
  (page_count * page_size) / (1024 * 1024) as total_mb
FROM pragma_page_count(), pragma_page_size(), pragma_database_list() 
WHERE name = 'main';

-- Verificar integridade (apenas se necessário)
-- PRAGMA integrity_check;