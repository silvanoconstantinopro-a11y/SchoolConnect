// ── MODAIS GLOBAIS ──────────────────────────────────────────────
let acaoConfirmada = null;

function abrirModalConfirmacao(titulo, mensagem, callback) {
  const modal = document.getElementById("modalConfirmar");
  if (!modal) {
    console.error("Modal de confirmação não encontrado");
    if (confirm(mensagem)) {
      if (callback) callback();
    }
    return;
  }
  
  const tituloEl = document.getElementById("modalTitulo");
  const msgEl = document.getElementById("mensagemConfirmar");
  if (tituloEl) tituloEl.innerText = titulo;
  if (msgEl) msgEl.innerHTML = mensagem;

  acaoConfirmada = callback;

  const btn = document.getElementById("btnConfirmarRemocao");
  if (btn) {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.onclick = () => {
      if (acaoConfirmada) acaoConfirmada();
      fecharModalConfirmar();
    };
  }

  abrirModal("modalConfirmar");
}

function fecharModalConfirmar() {
  fecharModal("modalConfirmar");
  acaoConfirmada = null;
}

function abrirModalNotificacao(titulo, mensagem) {
  const modal = document.getElementById("modalNotificacao");
  if (!modal) {
    console.error("Modal de notificação não encontrado");
    alert(mensagem);
    return;
  }
  
  const tituloEl = document.getElementById("modalNotificacaoTitulo");
  const msgEl = document.getElementById("mensagemNotificacao");
  if (tituloEl) tituloEl.innerText = titulo;
  if (msgEl) msgEl.innerHTML = mensagem;
  
  abrirModal("modalNotificacao");
}

function fecharModalNotificacao() {
  fecharModal("modalNotificacao");
}

function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) {
    console.error(`Modal com id "${id}" não encontrado`);
    return;
  }
  modal.style.display = "flex";
  modal.classList.remove("hidden");
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  if (!modal) {
    console.error(`Modal com id "${id}" não encontrado`);
    return;
  }
  modal.style.display = "none";
  modal.classList.add("hidden");
}

// ── TOAST NOTIFICATIONS ─────────────────────────────────────────
function toast(mensagem, tipo = "sucesso") {
  const existingToast = document.querySelector(".custom-toast");
  if (existingToast) existingToast.remove();
  
  const div = document.createElement("div");
  div.textContent = mensagem;
  
  let bgColor = "bg-green-600";
  let icon = "✓";
  if (tipo === "erro") {
    bgColor = "bg-red-600";
    icon = "✕";
  } else if (tipo === "info") {
    bgColor = "bg-blue-600";
    icon = "ℹ";
  }
  
  div.className = `custom-toast fixed bottom-5 right-5 ${bgColor} text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-medium animate-fade-in-up`;
  
  const iconSpan = document.createElement("span");
  iconSpan.className = "mr-2";
  iconSpan.innerHTML = icon;
  div.prepend(iconSpan);
  
  document.body.appendChild(div);
  
  setTimeout(() => {
    div.style.opacity = "0";
    div.style.transform = "translateY(20px)";
    div.style.transition = "all 0.3s ease";
    setTimeout(() => {
      if (div.parentNode) div.remove();
    }, 300);
  }, 3000);
}

// ── ESTILOS GLOBAIS ────────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease forwards;
  }
  .spinner {
    border: 3px solid #e5e7eb;
    border-top: 3px solid #15803D;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    animation: spin 0.8s linear infinite;
    display: inline-block;
  }
`;
document.head.appendChild(style);

// ── FORMATADORES ───────────────────────────────────────────────
function formatarData(dataISO, formato = "curto") {
  if (!dataISO) return "-";
  const data = new Date(dataISO);
  if (formato === "curto") {
    return data.toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" });
  } else if (formato === "longo") {
    return data.toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }
  return data.toLocaleDateString("pt-PT");
}

function formatarNota(nota) {
  if (nota === undefined || nota === null) return "-";
  const num = parseFloat(nota);
  if (isNaN(num)) return "-";
  return num.toFixed(1);
}

function getCorNota(nota) {
  if (nota >= 15) return "text-green-600 font-bold";
  if (nota >= 10) return "text-blue-600 font-bold";
  return "text-red-600 font-bold";
}

// ── HELPERS DE UPLOAD ──────────────────────────────────────────
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("Imagem demasiado grande. Máximo 5MB."));
      return;
    }
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error("Erro ao ler ficheiro"));
    reader.readAsDataURL(file);
  });
}

function setupUpload(inputId, labelId, previewId, zoneId, defaultLabel) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  input.addEventListener("change", function () {
    const file = this.files[0];
    const label = document.getElementById(labelId);
    const preview = document.getElementById(previewId);
    const zone = document.getElementById(zoneId);
    
    if (!file) {
      if (label) label.textContent = defaultLabel;
      if (preview) preview.classList.add("hidden");
      if (zone) zone.classList.remove("has-file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast("Imagem demasiado grande. Máximo 5MB.", "erro");
      this.value = "";
      if (label) label.textContent = defaultLabel;
      if (preview) preview.classList.add("hidden");
      if (zone) zone.classList.remove("has-file");
      return;
    }
    
    if (label) label.textContent = file.name;
    if (zone) zone.classList.add("has-file");
    
    if (preview) {
      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
        preview.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    }
  });
}

function resetUpload(inputId, labelId, previewId, zoneId, defaultLabel) {
  const input = document.getElementById(inputId);
  const label = document.getElementById(labelId);
  const preview = document.getElementById(previewId);
  const zone = document.getElementById(zoneId);
  
  if (input) input.value = "";
  if (label) label.textContent = defaultLabel;
  if (preview) {
    preview.src = "";
    preview.classList.add("hidden");
  }
  if (zone) zone.classList.remove("has-file");
}

// ── VALIDAÇÕES ─────────────────────────────────────────────────
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefone(telefone) {
  return /^[\d\s+\-()]{9,15}$/.test(telefone);
}

function validarSenha(senha) {
  return senha.length >= 6;
}

// ── API HELPER ─────────────────────────────────────────────────
async function apiFetch(url, token, opts = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(opts.headers || {}),
    ...(token ? { "Authorization": "Bearer " + token } : {})
  };
  
  const response = await fetch(url, {
    ...opts,
    headers
  });
  
  return response;
}

// ── EXPORTAÇÃO GLOBAL ──────────────────────────────────────────
window.abrirModalConfirmacao = abrirModalConfirmacao;
window.fecharModalConfirmar = fecharModalConfirmar;
window.abrirModalNotificacao = abrirModalNotificacao;
window.fecharModalNotificacao = fecharModalNotificacao;
window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.toast = toast;
window.formatarData = formatarData;
window.formatarNota = formatarNota;
window.getCorNota = getCorNota;
window.fileToBase64 = fileToBase64;
window.setupUpload = setupUpload;
window.resetUpload = resetUpload;
window.validarEmail = validarEmail;
window.validarTelefone = validarTelefone;
window.validarSenha = validarSenha;
window.apiFetch = apiFetch;