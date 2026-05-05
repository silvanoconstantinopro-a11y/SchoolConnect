/**
 * logger.js
 * Utilitário de logging para a aplicação
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.join(__dirname, "..", "logs");
const LOG_FILE = path.join(LOG_DIR, "app.log");
const ERROR_LOG_FILE = path.join(LOG_DIR, "error.log");

// Garantir que diretório de logs existe
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const levels = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  DEBUG: "DEBUG"
};

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m"
};

const getColor = (level) => {
  switch (level) {
    case levels.INFO: return colors.green;
    case levels.WARN: return colors.yellow;
    case levels.ERROR: return colors.red;
    case levels.DEBUG: return colors.cyan;
    default: return colors.reset;
  }
};

const formatMessage = (level, message, ...args) => {
  const timestamp = new Date().toISOString();
  const color = getColor(level);
  const logMessage = `${timestamp} [${level}] ${message} ${args.map(arg => 
    typeof arg === "object" ? JSON.stringify(arg) : arg
  ).join(" ")}`;
  
  return { color, logMessage };
};

const writeToFile = (logMessage, isError = false) => {
  try {
    const logFile = isError ? ERROR_LOG_FILE : LOG_FILE;
    fs.appendFileSync(logFile, logMessage + "\n");
  } catch (error) {
    console.error(`Erro ao escrever no arquivo de log: ${error.message}`);
  }
};

export const logger = {
  info: (message, ...args) => {
    const { color, logMessage } = formatMessage(levels.INFO, message, ...args);
    console.log(`${color}${logMessage}${colors.reset}`);
    writeToFile(logMessage);
  },
  
  warn: (message, ...args) => {
    const { color, logMessage } = formatMessage(levels.WARN, message, ...args);
    console.warn(`${color}${logMessage}${colors.reset}`);
    writeToFile(logMessage);
  },
  
  error: (message, ...args) => {
    const { color, logMessage } = formatMessage(levels.ERROR, message, ...args);
    console.error(`${color}${logMessage}${colors.reset}`);
    writeToFile(logMessage, true);
  },
  
  debug: (message, ...args) => {
    if (process.env.NODE_ENV !== "production") {
      const { color, logMessage } = formatMessage(levels.DEBUG, message, ...args);
      console.debug(`${color}${logMessage}${colors.reset}`);
      writeToFile(logMessage);
    }
  },
  
  request: (req, res, next) => {
    logger.debug(`${req.method} ${req.path} - IP: ${req.ip}`);
    next();
  },
  
  errorRequest: (err, req, res, next) => {
    logger.error(`Erro na requisição ${req.method} ${req.path}: ${err.message}`);
    next(err);
  }
};

export default logger;