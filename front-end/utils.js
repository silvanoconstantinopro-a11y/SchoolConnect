let acaoConfirmada = null;

// 🔥 abrir modal de confirmação
function abrirModalConfirmacao(titulo, mensagem, callback) {
  const modalTitulo = document.getElementById("modalTitulo");
  const msg = document.getElementById("mensagemConfirmar");
  const btn = document.getElementById("btnConfirmarRemocao");

  if (!modalTitulo || !msg || !btn) return;

  modalTitulo.innerText = titulo;
  msg.innerHTML = mensagem;

  acaoConfirmada = callback;

  btn.onclick = () => {
    if (typeof acaoConfirmada === "function") {
      acaoConfirmada();
    }
    fecharModalConfirmar();
  };

  abrirModal("modalConfirmar");
}

function fecharModalConfirmar() {
  fecharModal("modalConfirmar");
  acaoConfirmada = null;
}

// 🔔 modal de notificação
function abrirModalNotificacao(titulo, mensagem) {
  const tituloEl = document.getElementById("modalNotificacaoTitulo");
  const msgEl = document.getElementById("mensagemNotificacao");

  if (!tituloEl || !msgEl) return;

  tituloEl.innerText = titulo;
  msgEl.innerHTML = mensagem;

  abrirModal("modalNotificacao");
}

function fecharModalNotificacao() {
  fecharModal("modalNotificacao");
}

// 📦 controle genérico de modais
function abrirModal(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.style.display = "flex";
  el.classList.remove("hidden");
}

function fecharModal(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.style.display = "none";
  el.classList.add("hidden");
}

// 🔥 toast mais seguro
function toast(mensagem) {
  const div = document.createElement("div");

  div.textContent = mensagem;

  div.className =
    "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}