/**
 * utils.js
 * Funções utilitárias compartilhadas entre todas as páginas
 */

// API Base URL
const API = "https://schoolconnect-0ud2.onrender.com";

// Modal de Confirmação
function abrirModalConfirmacao(titulo, mensagem, onConfirm) {
  const modal = document.getElementById("modalConfirmar");
  if (!modal) return;

  document.getElementById("modalTitulo").textContent = titulo;
  document.getElementById("mensagemConfirmar").innerHTML = mensagem;
  
  const btnConfirmar = document.getElementById("btnConfirmarRemocao");
  btnConfirmar.onclick = () => {
    fecharModalConfirmar();
    if (onConfirm) onConfirm();
  };
  
  modal.classList.remove("hidden");
  modal.style.display = "flex";
}

function fecharModalConfirmar() {
  const modal = document.getElementById("modalConfirmar");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
}

// Modal de Notificação
function abrirModalNotificacao(titulo, mensagem) {
  const modal = document.getElementById("modalNotificacao");
  if (!modal) {
    alert(mensagem);
    return;
  }

  document.getElementById("modalNotificacaoTitulo").textContent = titulo;
  document.getElementById("mensagemNotificacao").innerHTML = mensagem;
  
  modal.classList.remove("hidden");
  modal.style.display = "flex";
}

function fecharModalNotificacao() {
  const modal = document.getElementById("modalNotificacao");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
}

// Função para obter token
function getToken() {
  return localStorage.getItem("token") || localStorage.getItem("adminToken") || "";
}

// Função para fazer fetch com autenticação
async function apiFetch(url, opts = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(opts.headers || {}),
    ...(token ? { "Authorization": "Bearer " + token } : {})
  };
  
  // Se for FormData, não definir Content-Type
  if (opts.body instanceof FormData) {
    delete headers["Content-Type"];
  }
  
  return fetch(API + url, { ...opts, headers });
}

// Converter arquivo para Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("Arquivo demasiado grande. Máximo 5MB."));
      return;
    }
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error("Erro ao ler ficheiro"));
    reader.readAsDataURL(file);
  });
}

// Toast notification
function toast(msg, tipo = "sucesso") {
  const toastDiv = document.getElementById("toast");
  if (!toastDiv) return;
  
  const inner = document.getElementById("toastInner");
  inner.className = `flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white font-medium text-sm fade-in ${
    tipo === "sucesso" ? "bg-green-600" : tipo === "erro" ? "bg-red-600" : "bg-blue-600"
  }`;
  
  document.getElementById("toastIcon").textContent = tipo === "sucesso" ? "✓" : tipo === "erro" ? "✕" : "ℹ";
  document.getElementById("toastMsg").textContent = msg;
  
  toastDiv.classList.remove("hidden");
  setTimeout(() => toastDiv.classList.add("hidden"), 3500);
}

// Terminar sessão
function terminarSessao() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminLogado");
  window.location.href = "index.html";
}

// Validação de email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Formatar data
function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

// Verificar se está logado
function verificarAutenticacao() {
  const token = getToken();
  if (!token) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}