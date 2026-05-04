import multer from "multer";
import path   from "path";
import fs     from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Diretórios ────────────────────────────────────────────────
const DIR_ARQUIVOS = path.join(__dirname, "..", "uploads", "arquivos");
const DIR_IMAGENS  = path.join(__dirname, "..", "uploads", "imagens");

[DIR_ARQUIVOS, DIR_IMAGENS].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// ── Factory de storage ────────────────────────────────────────
const makeStorage = (dir) =>
  multer.diskStorage({
    destination: (_, __, cb) => cb(null, dir),
    filename:    (_, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, unique + path.extname(file.originalname));
    },
  });

// ── Filtro de imagens ─────────────────────────────────────────
const filtroImagem = (_, file, cb) => {
  const permitidos = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (permitidos.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Tipo de ficheiro não permitido. Use: JPEG, PNG, WEBP ou GIF."));
};

// ── Instâncias exportadas ─────────────────────────────────────
/** Para ficheiros gerais (PDFs, docs, imagens de mensagens) */
export const upload = multer({
  storage: makeStorage(DIR_ARQUIVOS),
  limits:  { fileSize: 30 * 1024 * 1024 }, // 30 MB
});

/** Para imagens de perfil / avisos / eventos */
export const uploadImagem = multer({
  storage:  makeStorage(DIR_IMAGENS),
  fileFilter: filtroImagem,
  limits:   { fileSize: 5 * 1024 * 1024 }, // 5 MB
});