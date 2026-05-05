// conectar_backend.js - Versão DEFINITIVA (sem erros)
(function () {
    console.log("🚀 SchoolConnect: Inicializando conector do backend...");

    // ============================================
    // 1. CONFIGURAÇÃO AUTOMÁTICA DA URL (NUNCA FALHA)
    // ============================================
    const getBackendURL = () => {
        // Se já estiver definido globalmente, usa
        if (window.__BACKEND_URL__) return window.__BACKEND_URL__;
        
        const host = window.location.hostname;
        
        // Render.com (produção)
        if (host.includes('onrender.com')) {
            return 'https://schoolconnect-0ud2.onrender.com';
        }
        
        // Localhost (desenvolvimento)
        if (host === 'localhost' || host === '127.0.0.1') {
            return 'http://localhost:3002';
        }
        
        // Fallback: mesma origem + porta 3002
        return `${window.location.protocol}//${host}:3002`;
    };

    const BACKEND_URL = getBackendURL();
    
    // DEFINE TODAS AS VARIÁVEIS QUE OS DIFERENTES FICHEIROS USAM
    window.API = BACKEND_URL;           // Para dashboard-professor.html, dashboard-encarregado.html
    window.API_URL = BACKEND_URL;       // Para login.html, registro.html, index.html
    window.BACKEND_URL = BACKEND_URL;   // Para consistência
    window.__BACKEND_URL__ = BACKEND_URL; // Cache
    
    // WebSocket URL
    window.WS_URL = window.location.protocol === "https:"
        ? BACKEND_URL.replace("https", "wss")
        : BACKEND_URL.replace("http", "ws");
    
    console.log(`📍 API: ${window.API}`);
    console.log(`🔌 WS: ${window.WS_URL}`);

    // ============================================
    // 2. FUNÇÃO DE FETCH ROBUSTA (compatível com todos)
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
        
        // Se for FormData, remove o Content-Type para o browser definir corretamente
        if (options.body instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        
        try {
            const response = await fetch(url, config);
            
            // Tenta fazer parse do JSON
            let data = {};
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    data = await response.json();
                } catch (e) {
                    data = { message: await response.text() };
                }
            } else {
                data = { message: await response.text() };
            }
            
            if (!response.ok) {
                throw new Error(data.error || data.message || `Erro HTTP ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error(`❌ API Error [${endpoint}]:`, error);
            throw error;
        }
    };
    
    // Métodos HTTP simplificados
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
    // 3. FUNÇÕES DE LOGIN (compatíveis com todos os ficheiros)
    // ============================================
    window.fazerLogin = async function(email, senha, tipo = 'usuario') {
        const endpoint = tipo === 'admin' ? '/api/admin/login' : '/api/login';
        
        try {
            const data = await window.apiFetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({ 
                    email: email, 
                    senha: senha,
                    ...(tipo === 'admin' && { utilizador: email })
                })
            });
            
            if (data.token) {
                if (tipo === 'admin') {
                    localStorage.setItem('adminToken', data.token);
                    localStorage.setItem('adminLogado', 'true');
                    localStorage.removeItem('token');
                    localStorage.removeItem('usuario');
                } else {
                    localStorage.setItem('token', data.token);
                    if (data.usuario) {
                        localStorage.setItem('usuario', JSON.stringify(data.usuario));
                    }
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminLogado');
                }
                return { success: true, data };
            }
            
            return { success: false, error: data.message || 'Login falhou' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };
    
    // ============================================
    // 4. FUNÇÕES DE SESSÃO
    // ============================================
    window.estaLogado = function() {
        return !!(localStorage.getItem('token') || localStorage.getItem('adminToken'));
    };
    
    window.getUsuarioLogado = function() {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            return { perfil: 'ADMIN', nome: 'Administrador' };
        }
        
        const usuarioStr = localStorage.getItem('usuario');
        if (usuarioStr) {
            try {
                return JSON.parse(usuarioStr);
            } catch (e) {
                return null;
            }
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
    // 5. TESTE DE CONEXÃO
    // ============================================
    window.testarConexao = async function() {
        try {
            const response = await fetch(`${window.API}/api/health`);
            if (response.ok) {
                console.log('✅ Backend conectado!');
                return true;
            }
            const fallback = await fetch(`${window.API}/api`);
            if (fallback.ok) {
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
    // 6. TOAST GLOBAL (compatível com utils.js)
    // ============================================
    window.toast = function(mensagem, tipo = 'sucesso') {
        // Verifica se já existe um toast personalizado
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensagem, tipo);
            return;
        }
        
        // Cria toast temporário
        const toast = document.createElement('div');
        toast.textContent = mensagem;
        toast.className = `fixed bottom-5 right-5 z-50 px-4 py-2 rounded-lg shadow-lg text-white text-sm font-semibold ${
            tipo === 'sucesso' ? 'bg-green-600' : tipo === 'erro' ? 'bg-red-600' : 'bg-blue-600'
        } animate-bounce`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };
    
    // ============================================
    // 7. CONFIGURAR WEBSOCKET (se necessário)
    // ============================================
    let ws = null;
    let wsCallbacks = {};
    
    window.initWebSocket = function(onMessageCallback) {
        const token = getToken();
        if (!token) {
            console.warn('⚠️ Sem token, não é possível conectar WebSocket');
            return null;
        }
        
        ws = new WebSocket(`${window.WS_URL}?token=${token}`);
        
        ws.onopen = () => {
            console.log('🔌 WebSocket conectado');
            if (wsCallbacks.onopen) wsCallbacks.onopen();
        };
        
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (onMessageCallback) onMessageCallback(data);
                if (wsCallbacks.onmessage) wsCallbacks.onmessage(data);
            } catch (e) {
                console.error('Erro ao processar mensagem WS:', e);
            }
        };
        
        ws.onclose = () => {
            console.log('🔌 WebSocket desconectado');
            if (wsCallbacks.onclose) wsCallbacks.onclose();
            // Tenta reconectar após 5 segundos
            setTimeout(() => window.initWebSocket(onMessageCallback), 5000);
        };
        
        ws.onerror = (error) => {
            console.error('❌ WebSocket erro:', error);
            if (wsCallbacks.onerror) wsCallbacks.onerror(error);
        };
        
        return ws;
    };
    
    window.enviarWS = function(payload) {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(payload));
            return true;
        }
        return false;
    };
    
    window.onWS = function(event, callback) {
        wsCallbacks[event] = callback;
    };
    
    // ============================================
    // 8. AUTO-INICIALIZAÇÃO DE FORMULÁRIOS DE LOGIN
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        // Procura por formulários de login em todas as páginas
        const loginForms = document.querySelectorAll('#loginForm, .login-form, form[action*="login"]');
        
        loginForms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"], input[name="email"]');
                const senhaInput = form.querySelector('input[type="password"], input[name="password"]');
                
                if (!emailInput || !senhaInput) return;
                
                const email = emailInput.value;
                const senha = senhaInput.value;
                const submitBtn = form.querySelector('button[type="submit"], button:not([type="button"])');
                
                if (!email || !senha) {
                    window.toast('Preencha email e palavra-passe', 'erro');
                    return;
                }
                
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'A entrar...';
                    
                    const isAdmin = window.location.pathname.includes('admin') || form.id === 'adminForm';
                    const result = await window.fazerLogin(email, senha, isAdmin ? 'admin' : 'usuario');
                    
                    if (result.success) {
                        window.toast('Login realizado com sucesso!');
                        
                        // Redireciona baseado no perfil
                        if (isAdmin || result.data.usuario?.perfil === 'ADMIN') {
                            setTimeout(() => window.location.href = 'admin.html', 500);
                        } else if (result.data.usuario?.perfil === 'PROFESSOR') {
                            setTimeout(() => window.location.href = 'dashboard-professor.html', 500);
                        } else if (result.data.usuario?.perfil === 'ENCARREGADO') {
                            setTimeout(() => window.location.href = 'dashboard-encarregado.html', 500);
                        } else {
                            setTimeout(() => window.location.href = 'index.html', 500);
                        }
                    } else {
                        window.toast(result.error, 'erro');
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }
                }
            });
        });
        
        // Testa conexão com backend
        setTimeout(() => window.testarConexao(), 1000);
    });
    
    console.log('✅ SchoolConnect: Backend connector pronto!');
})();