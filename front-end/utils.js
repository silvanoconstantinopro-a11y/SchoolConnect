let acaoConfirmada = null;

function abrirModalConfirmacao(titulo, mensagem, callback) {
  const modal = document.getElementById("modalConfirmar");
  if (!modal) {
    console.error("Modal de confirmação não encontrado");
    return;
  }
  
  document.getElementById("modalTitulo").innerText = titulo;
  document.getElementById("mensagemConfirmar").innerHTML = mensagem;

  acaoConfirmada = callback;

  const btn = document.getElementById("btnConfirmarRemocao");
  if (btn) {
    // Remove listeners anteriores para evitar duplicação
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
    return;
  }
  
  document.getElementById("modalNotificacaoTitulo").innerText = titulo;
  document.getElementById("mensagemNotificacao").innerHTML = mensagem;
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

function toast(mensagem, tipo = "sucesso") {
  // Remove toast existente se houver
  const existingToast = document.querySelector(".custom-toast");
  if (existingToast) {
    existingToast.remove();
  }
  
  const div = document.createElement("div");
  div.textContent = mensagem;
  
  // Estilos baseados no tipo
  let bgColor = "bg-green-600";
  if (tipo === "erro") bgColor = "bg-red-600";
  if (tipo === "info") bgColor = "bg-blue-600";
  
  div.className = `custom-toast fixed bottom-5 right-5 ${bgColor} text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-medium animate-fade-in-up`;
  
  // Adicionar ícone baseado no tipo
  const icon = document.createElement("span");
  icon.className = "mr-2";
  if (tipo === "sucesso") icon.innerHTML = "✓";
  if (tipo === "erro") icon.innerHTML = "✕";
  if (tipo === "info") icon.innerHTML = "ℹ";
  
  div.prepend(icon);
  
  document.body.appendChild(div);
  
  // Animação de fade out antes de remover
  setTimeout(() => {
    div.style.opacity = "0";
    div.style.transform = "translateY(20px)";
    div.style.transition = "all 0.3s ease";
    setTimeout(() => {
      if (div.parentNode) div.remove();
    }, 300);
  }, 3000);
}

// Adicionar estilos de animação dinamicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease forwards;
  }
`;
document.head.appendChild(style);