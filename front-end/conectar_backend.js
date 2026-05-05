// conectar_backend.js - VERSÃO FUNCIONAL
(function () {
    console.log("🚀 SchoolConnect: Inicializando...");

    // URL fixa porque o backend está na porta 3000
    const BACKEND_URL = 'http://localhost:3000';
    
    window.API = BACKEND_URL;
    window.API_URL = BACKEND_URL;
    window.BACKEND_URL = BACKEND_URL;
    
    console.log(`📍 API: ${window.API}`);

    // ============================================
    // LOGIN ADMIN DIRETO (sem complicações)
    // ============================================
    window.fazerLoginAdmin = async function(utilizador, senha) {
        console.log(`🔐 Tentando login em: ${window.API}/api/admin/login`);
        
        try {
            const response = await fetch(`${window.API}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ utilizador, senha })
            });
            
            // Verificar se a resposta é JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Resposta não é JSON:', text);
                throw new Error('Servidor não respondeu com JSON. Verifique a rota /api/admin/login');
            }
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || data.message || 'Credenciais inválidas');
            }
            
            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminLogado', 'true');
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                return { success: true, data };
            }
            
            return { success: false, error: 'Token não recebido' };
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, error: error.message };
        }
    };
    
    // ============================================
    // TESTE DE CONEXÃO (já está funcionando)
    // ============================================
    window.testarConexao = async function() {
        try {
            const response = await fetch(`${window.API}/api/health`);
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Backend conectado!', data);
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Backend offline:', error.message);
            return false;
        }
    };
    
    // ============================================
    // TOAST SIMPLES
    // ============================================
    window.mostrarToast = function(mensagem, tipo = 'sucesso') {
        const toast = document.createElement('div');
        toast.textContent = mensagem;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            background-color: ${tipo === 'sucesso' ? '#15803D' : '#DC2626'};
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: fadeInOut 3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };
    
    window.toast = window.mostrarToast;
    
    // ============================================
    // SAIR
    // ============================================
    window.sair = function() {
        localStorage.clear();
        window.location.href = 'login.html';
    };
    
    // ============================================
    // VERIFICAR SESSÃO
    // ============================================
    window.estaLogado = function() {
        return !!(localStorage.getItem('token') || localStorage.getItem('adminToken'));
    };
    
    window.verificarSessaoAdmin = function() {
        const token = localStorage.getItem('adminToken');
        const logado = localStorage.getItem('adminLogado');
        if (!token || logado !== 'true') {
            if (window.location.pathname.includes('admin.html') && 
                !window.location.pathname.includes('login-admin.html')) {
                window.location.href = 'login-admin.html';
            }
            return false;
        }
        return true;
    };
    
    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => window.testarConexao(), 500);
        
        // Verificar sessão na página admin
        if (window.location.pathname.includes('admin.html') && 
            !window.location.pathname.includes('login-admin.html')) {
            window.verificarSessaoAdmin();
        }
    });
    
    console.log('✅ SchoolConnect: Backend connector pronto!');
})();