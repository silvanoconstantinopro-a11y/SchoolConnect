/**
 * validate.js
 * Middleware de validação com express-validator
 */
import { validationResult } from "express-validator";
import { logger } from "../utils/logger.js";

/**
 * Middleware principal de validação
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
      value: err.value
    }));
    
    logger.warn(`Erro de validação em ${req.method} ${req.path}:`, formattedErrors);
    
    return res.status(400).json({ 
      error: "Erro de validação",
      code: "VALIDATION_ERROR",
      details: formattedErrors
    });
  }
  
  next();
};

/**
 * Validação de ID numérico
 */
export const validateId = (paramName = "id") => {
  return (req, res, next) => {
    const id = parseInt(req.params[paramName]);
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        error: "ID inválido",
        code: "INVALID_ID",
        param: paramName
      });
    }
    
    req[`${paramName}Number`] = id;
    next();
  };
};

/**
 * Validação de paginação
 */
export const validatePagination = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  if (page < 1 || limit < 1 || limit > 100) {
    return res.status(400).json({
      error: "Parâmetros de paginação inválidos",
      code: "INVALID_PAGINATION"
    });
  }
  
  req.pagination = {
    page,
    limit,
    offset: (page - 1) * limit
  };
  
  next();
};

/**
 * Validação de data
 */
export const validateDate = (dateString, fieldName = "data") => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`${fieldName} inválida`);
  }
  
  return date;
};

/**
 * Sanitização de strings
 */
export const sanitizeString = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.trim().replace(/[<>]/g, ""); // Previne XSS básico
};

/**
 * Sanitização de email
 */
export const sanitizeEmail = (email) => {
  if (!email || typeof email !== "string") return "";
  return email.trim().toLowerCase();
};

/**
 * Sanitização de telefone
 */
export const sanitizePhone = (phone) => {
  if (!phone || typeof phone !== "string") return "";
  return phone.replace(/[^\d+]/g, "");
};

export default validate;