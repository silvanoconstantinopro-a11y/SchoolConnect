import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Diretórios ────────────────────────────────────────────────
const DIR_ARQUIVOS = path.join(__dirname, "..", "uploads", "arquivos");
const DIR_IMAGENS = path.join(__dirname, "..", "uploads", "imagens");
const DIR_TEMP = path.join(__dirname, "..", "uploads", "temp");

// Criar diretórios recursivamente
[DIR_ARQUIVOS, DIR_IMAGENS, DIR_TEMP].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁  Criado diretório: ${dir}`);
  }
});

// ── Limpeza periódica de arquivos temporários (opcional) ─────
setInterval(() => {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 horas
  
  if (fs.existsSync(DIR_TEMP)) {
    fs.readdir(DIR_TEMP, (err, files) => {
      if (err) return;
      files.forEach(file => {
        const filePath = path.join(DIR_TEMP, file);
        fs.stat(filePath, (err, stats) => {
          if (err) return;
          if (now - stats.mtimeMs > maxAge) {
            fs.unlink(filePath, () => {});
          }
        });
      });
    });
  }
}, 6 * 60 * 60 * 1000); // A cada 6 horas

// ── Factory de storage ────────────────────────────────────────
const makeStorage = (dir) => 
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const sanitizedName = file.originalname
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/[^a-zA-Z0-9.-]/g, "_"); // Remove caracteres especiais
      
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(sanitizedName);
      const baseName = path.basename(sanitizedName, ext);
      const finalName = `${unique}-${baseName.substring(0, 50)}${ext}`;
      
      cb(null, finalName);
    }
  });

// ── Filtros ───────────────────────────────────────────────────
const filtroImagem = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de ficheiro não permitido. Use: ${allowedMimes.join(", ")}`));
  }
};

const filtroDocumento = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain"
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de ficheiro não permitido. Formatos aceites: imagens, PDF, DOC, TXT`));
  }
};

// ── Instâncias exportadas ─────────────────────────────────────
/** Para ficheiros gerais (PDFs, docs, imagens de mensagens) */
export const upload = multer({
  storage: makeStorage(DIR_ARQUIVOS),
  fileFilter: filtroDocumento,
  limits: { 
    fileSize: 30 * 1024 * 1024, // 30 MB
    files: 5
  }
});

/** Apenas para imagens de perfil / avisos / eventos */
export const uploadImagem = multer({
  storage: makeStorage(DIR_IMAGENS),
  fileFilter: filtroImagem,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1
  }
});

/** Para uploads temporários */
export const uploadTemp = multer({
  storage: makeStorage(DIR_TEMP),
  fileFilter: filtroDocumento,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

// ── Helpers para gerenciar arquivos ──────────────────────────
export function deleteUploadedFile(filePath) {
  if (!filePath) return false;
  
  // Converte URL path para path do sistema
  let systemPath = filePath;
  if (filePath.startsWith("/uploads/")) {
    systemPath = path.join(__dirname, "..", filePath);
  }
  
  try {
    if (fs.existsSync(systemPath)) {
      fs.unlinkSync(systemPath);
      return true;
    }
  } catch (err) {
    console.error(`Erro ao deletar arquivo ${systemPath}:`, err.message);
  }
  return false;
}