/**
 * validador.js
 * Utilitários de validação para a aplicação
 */

export const validador = {
  /**
   * Valida formato de email
   */
  validarEmail: (email) => {
    if (!email || typeof email !== "string") return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  },
  
  /**
   * Valida formato de telefone (brasileiro)
   */
  validarTelefone: (telefone) => {
    if (!telefone || typeof telefone !== "string") return false;
    const cleaned = telefone.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 11;
  },
  
  /**
   * Valida CPF
   */
  validarCPF: (cpf) => {
    if (!cpf || typeof cpf !== "string") return false;
    const cleaned = cpf.replace(/\D/g, "");
    if (cleaned.length !== 11) return false;
    
    // Verificar dígitos repetidos
    if (/^(\d)\1{10}$/.test(cleaned)) return false;
    
    // Validar primeiro dígito
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cleaned.charAt(9))) return false;
    
    // Validar segundo dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    return digit === parseInt(cleaned.charAt(10));
  },
  
  /**
   * Valida data no formato ISO
   */
  validarData: (data) => {
    if (!data) return false;
    const date = new Date(data);
    return !isNaN(date.getTime());
  },
  
  /**
   * Valida se é número inteiro positivo
   */
  validarId: (id) => {
    const num = Number(id);
    return !isNaN(num) && Number.isInteger(num) && num > 0;
  },
  
  /**
   * Valida se string não está vazia
   */
  validarString: (str, minLength = 1, maxLength = Infinity) => {
    if (!str || typeof str !== "string") return false;
    const trimmed = str.trim();
    return trimmed.length >= minLength && trimmed.length <= maxLength;
  },
  
  /**
   * Valida se valor está entre min e max
   */
  validarRange: (valor, min, max) => {
    const num = Number(valor);
    return !isNaN(num) && num >= min && num <= max;
  },
  
  /**
   * Valida URL
   */
  validarURL: (url) => {
    if (!url || typeof url !== "string") return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  /**
   * Sanitiza string (remove tags HTML e espaços extras)
   */
  sanitizarString: (str) => {
    if (!str || typeof str !== "string") return "";
    return str.trim().replace(/[<>]/g, "");
  },
  
  /**
   * Sanitiza email
   */
  sanitizarEmail: (email) => {
    if (!email || typeof email !== "string") return "";
    return email.trim().toLowerCase();
  },
  
  /**
   * Sanitiza telefone (remove caracteres não numéricos)
   */
  sanitizarTelefone: (telefone) => {
    if (!telefone || typeof telefone !== "string") return "";
    return telefone.replace(/\D/g, "");
  }
};

export default validador;