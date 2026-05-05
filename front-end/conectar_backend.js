// conectar_backend.js - VERSÃO COMPLETA E CORRIGIDA
(function () {
    console.log("🚀 SchoolConnect: Inicializando conector...");

    // ============================================
    // CONFIGURAÇÃO - PORTA CORRETA (3000)
    // ============================================
    const BACKEND_URL = 'http://localhost:3000';
    
    window.API = BACKEND_URL;
    window.API_URL = BACKEND_URL;
    window.BACKEND_URL = BACKEND_URL;
    
    console.log(`📍 Backend API: ${window.API}`);

    // ============================================
    // FUNÇÃO BASE DE FETCH
    // ============================================
    const getToken = () => {
        return localStorage.getItem('adminToken') || localStorage.getItem('token') || null;
    };

    window.apiFetch = async function(endpoint, options = {}) {
        const url = endpoint.startsWith('http') ? endpoint : window.API + endpoint;
        const token = getToken();
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...(options.headers || {})
            }
        };
        
        // Se for FormData, remove o Content-Type
        if (options.body instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        
        try {
            console.log(`📡 ${options.method || 'GET'} ${url}`);
            const response = await fetch(url, config);
            
            // Verificar se a resposta é JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Resposta não é JSON:', text.substring(0, 200));
                throw new Error(`Servidor não respondeu com JSON. Verifique se o backend está a correr em ${window.API} e se a rota ${endpoint} existe.`);
            }
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || data.message || `Erro ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error(`❌ Erro [${endpoint}]:`, error);
            throw error;
        }
    };
    
    // Métodos HTTP
    window.apiGet = (endpoint) => window.apiFetch(endpoint);
    window.apiPost = (endpoint, data) => window.apiFetch(endpoint, { 
        method: 'POST', 
        body: JSON.stringify(data) 
    });
    window.apiPut = (endpoint, data) => window.apiFetch(endpoint, { 
        method: 'PUT', 
        body: JSON.stringify(data) 
    });
    window.apiDelete = (endpoint) => window.apiFetch(endpoint, { 
        method: 'DELETE' 
    });

    // ============================================
    // LOGIN NORMAL (para professores e encarregados)
    // ============================================
    window.fazerLogin = async function(email, senha) {
        console.log(`🔐 Login normal: ${window.API}/api/login`);
        
        try {
            const response = await fetch(`${window.API}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            
            // Verificar se é JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Resposta:', text);
                throw new Error(`Servidor não respondeu com JSON. Verifique se o backend está a correr em ${window.API} e se a rota POST /api/login existe.`);
            }
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || data.message || 'Credenciais inválidas');
            }
            
            if (data.token) {
                localStorage.setItem('token', data.token);
                if (data.usuario) {
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));
                }
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminLogado');
                return { success: true, data };
            }
            
            return { success: false, error: 'Token não recebido' };
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, error: error.message };
        }
    };
    
    // ============================================
    // LOGIN ADMIN
    // ============================================
    window.fazerLoginAdmin = async function(utilizador, senha) {
        console.log(`🔐 Login admin: ${window.API}/api/admin/login`);
        
        try {
            const response = await fetch(`${window.API}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ utilizador, senha })
            });
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Resposta:', text);
                throw new Error(`Servidor não respondeu com JSON. Verifique se a rota POST /api/admin/login existe.`);
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
            console.error('Erro no login admin:', error);
            return { success: false, error: error.message };
        }
    };
    
    // ============================================
    // TESTE DE CONEXÃO
    // ============================================
    window.testarConexao = async function() {
        console.log(`🔍 Testando conexão com ${window.API}...`);
        
        try {
            // Testa /api/health primeiro
            let response = await fetch(`${window.API}/api/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Backend conectado!', data);
                return true;
            }
            
            // Fallback: testa /api
            response = await fetch(`${window.API}/api`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                console.log('✅ Backend conectado!');
                return true;
            }
            
            throw new Error('Backend não responde');
        } catch (error) {
            console.error('❌ Backend offline:', error.message);
            return false;
        }
    };
    
    // ============================================
    // VERIFICAÇÕES DE SESSÃO
    // ============================================
    window.estaLogado = function() {
        return !!(localStorage.getItem('token') || localStorage.getItem('adminToken'));
    };
    
    window.getUsuarioLogado = function() {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            return { perfil: 'ADMIN', nome: 'Administrador' };
        }
        
        try {
            const usuarioStr = localStorage.getItem('usuario');
            if (usuarioStr) {
                return JSON.parse(usuarioStr);
            }
        } catch (e) {
            console.error('Erro ao parsear usuário:', e);
        }
        return null;
    };
    
    window.sair = function(redirectTo = 'login.html') {
        localStorage.clear();
        if (redirectTo) {
            window.location.href = redirectTo;
        }
    };
    
    // ============================================
    // TOAST
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
            background-color: ${tipo === 'sucesso' ? '#15803D' : tipo === 'erro' ? '#DC2626' : '#2563EB'};
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: fadeInOut 3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };
    
    window.toast = window.mostrarToast;
    
    // ============================================
    // AUTO-INICIALIZAÇÃO
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM carregado, inicializando...');
        
        // Testar conexão após 1 segundo
        setTimeout(() => {
            window.testarConexao();
        }, 1000);
        
        // Verificar sessão na página admin
        if (window.location.pathname.includes('admin.html') && 
            !window.location.pathname.includes('login-admin.html')) {
            const token = localStorage.getItem('adminToken');
            const logado = localStorage.getItem('adminLogado');
            if (!token || logado !== 'true') {
                console.log('🔒 Redirecionando para login admin...');
                window.location.href = 'login-admin.html';
            }
        }
        
        // Configurar formulários de login automaticamente
        const loginForm = document.querySelector('#loginForm, form[action*="login"], .login-form');
        if (loginForm && !loginForm.hasAttribute('data-ws-configured')) {
            loginForm.setAttribute('data-ws-configured', 'true');
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const emailInput = loginForm.querySelector('input[type="email"], input[name="email"]');
                const senhaInput = loginForm.querySelector('input[type="password"], input[name="password"]');
                
                if (emailInput && senhaInput) {
                    const result = await window.fazerLogin(emailInput.value, senhaInput.value);
                    if (result.success) {
                        window.toast('Login realizado com sucesso!');
                        const usuario = result.data.usuario;
                        if (usuario.perfil === 'PROFESSOR') {
                            setTimeout(() => window.location.href = 'dashboard-professor.html', 500);
                        } else if (usuario.perfil === 'ENCARREGADO') {
                            setTimeout(() => window.location.href = 'dashboard-encarregado.html', 500);
                        } else {
                            setTimeout(() => window.location.href = 'index.html', 500);
                        }
                    } else {
                        window.toast(result.error, 'erro');
                    }
                }
            });
        }
    });
    
    console.log('✅ SchoolConnect: Backend connector pronto!');
})();