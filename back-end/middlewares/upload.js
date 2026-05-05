/**
 * upload.js
 * Configuração de upload de arquivos
 */
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, "..");

// Configurações
const UPLOAD_DIR = path.join(rootPath, "uploads", "arquivos");
const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain"
];

// Garantir que diretório existe
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  logger.info(`Diretório de upload criado: ${UPLOAD_DIR}`);
}

/**
 * Filtro de arquivos por tipo MIME
 */
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    logger.warn(`Tipo de arquivo não permitido: ${file.mimetype}`);
    cb(new Error(`Tipo de arquivo não permitido. Tipos permitidos: ${ALLOWED_MIME_TYPES.join(", ")}`), false);
  }
};

/**
 * Configuração de storage com validação de nome
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Sanitizar nome do arquivo
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    const sanitizedBase = baseName.replace(/[^a-zA-Z0-9]/g, "_");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${sanitizedBase}-${uniqueSuffix}${ext}`;
    
    cb(null, filename);
  }
});

/**
 * Configuração do multer
 */
export const upload = multer({
  storage,
  limits: { 
    fileSize: MAX_FILE_SIZE,
    files: 5 // máximo de 5 arquivos por requisição
  },
  fileFilter
});

/**
 * Middleware para upload único com tratamento de erro
 */
export const uploadSingle = (fieldName = "arquivo") => {
  return (req, res, next) => {
    const uploadMiddleware = upload.single(fieldName);
    
    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ 
              error: `Arquivo muito grande. Máximo: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
              code: "FILE_TOO_LARGE"
            });
          }
          if (err.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({ 
              error: "Muitos arquivos enviados",
              code: "TOO_MANY_FILES"
            });
          }
          return res.status(400).json({ 
            error: `Erro no upload: ${err.message}`,
            code: "UPLOAD_ERROR"
          });
        }
        
        if (err.message.includes("não permitido")) {
          return res.status(400).json({ 
            error: err.message,
            code: "FILE_TYPE_NOT_ALLOWED"
          });
        }
        
        logger.error(`Erro no upload: ${err.message}`);
        return res.status(500).json({ 
          error: "Erro interno ao processar upload",
          code: "INTERNAL_UPLOAD_ERROR"
        });
      }
      
      next();
    });
  };
};

/**
 * Middleware para upload múltiplo
 */
export const uploadMultiple = (fieldName = "arquivos", maxCount = 5) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.array(fieldName, maxCount);
    
    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ 
              error: `Arquivo muito grande. Máximo: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
              code: "FILE_TOO_LARGE"
            });
          }
          if (err.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({ 
              error: `Muitos arquivos. Máximo: ${maxCount}`,
              code: "TOO_MANY_FILES"
            });
          }
          return res.status(400).json({ 
            error: `Erro no upload: ${err.message}`,
            code: "UPLOAD_ERROR"
          });
        }
        
        return res.status(400).json({ 
          error: err.message,
          code: "UPLOAD_ERROR"
        });
      }
      
      next();
    });
  };
};

/**
 * Função para deletar arquivo
 */
export const deleteFile = (filePath) => {
  try {
    const fullPath = path.join(UPLOAD_DIR, path.basename(filePath));
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      logger.info(`Arquivo deletado: ${fullPath}`);
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`Erro ao deletar arquivo: ${error.message}`);
    return false;
  }
};

/**
 * Obter caminho completo do arquivo
 */
export const getFilePath = (filename) => {
  return path.join(UPLOAD_DIR, filename);
};

/**
 * Verificar se arquivo existe
 */
export const fileExists = (filename) => {
  return fs.existsSync(getFilePath(filename));
};

export default upload;