// conectar_backend.js - Versão DEFINITIVA E CORRIGIDA
(function () {
    console.log("🚀 SchoolConnect: Inicializando conector do backend...");

    // ============================================
    // 1. DETERMINAR URL DO BACKEND CORRETAMENTE
    // ============================================
    const determinarBackendURL = () => {
        // Se já foi definida manualmente
        if (window.__BACKEND_URL__) return window.__BACKEND_URL__;
        
        const host = window.location.hostname;
        const protocol = window.location.protocol;
        
        // Produção (Render)
        if (host.includes('onrender.com')) {
            return 'https://schoolconnect-0ud2.onrender.com';
        }
        
        // Localhost - PORTA CORRETA: 3000
        if (host === 'localhost' || host === '127.0.0.1') {
            // Se a página está na porta 3000, usa a mesma origem
            if (window.location.port === '3000') {
                return window.location.origin;
            }
            // Caso contrário, aponta para localhost:3000
            return 'http://localhost:3000';
        }
        
        // Se for file:// protocol (abrir diretamente)
        if (protocol === 'file:') {
            return 'http://localhost:3000';
        }
        
        // Fallback
        return window.location.origin;
    };

    const BACKEND_URL = determinarBackendURL();
    
    // Definir todas as variáveis que os diferentes ficheiros usam
    window.API = BACKEND_URL;
    window.API_URL = BACKEND_URL;
    window.BACKEND_URL = BACKEND_URL;
    window.__BACKEND_URL__ = BACKEND_URL;
    
    // WebSocket URL
    window.WS_URL = BACKEND_URL.replace(/^http/, 'ws');
    
    console.log(`📍 API: ${window.API}`);
    console.log(`🔌 WS: ${window.WS_URL}`);

    // ============================================
    // 2. FUNÇÃO DE FETCH ROBUSTA
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
        
        // Se for FormData, remove Content-Type para o browser definir corretamente
        if (options.body instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        
        try {
            console.log(`📡 Requisição: ${options.method || 'GET'} ${url}`);
            const response = await fetch(url, config);
            
            // Verificar se a resposta é HTML (erro comum)
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                const text = await response.text();
                console.error('Resposta HTML recebida:', text.substring(0, 200));
                throw new Error(`Servidor retornou HTML. Verifique se o backend está a correr em ${window.API}`);
            }
            
            // Parse do JSON
            let data;
            try {
                data = await response.json();
            } catch (e) {
                const text = await response.text();
                console.error('Resposta não é JSON:', text.substring(0, 200));
                throw new Error(`Resposta inválida do servidor. Esperado JSON.`);
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
    // 3. FUNÇÕES DE LOGIN
    // ============================================
    
    // Login normal (para professores e encarregados)
    window.fazerLogin = async function(email, senha) {
        console.log(`🔐 Login normal em: ${window.API}/api/login`);
        
        try {
            const response = await fetch(`${window.API}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            
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
    
    // Login admin
    window.fazerLoginAdmin = async function(utilizador, senha) {
        console.log(`🔐 Login admin em: ${window.API}/api/admin/login`);
        
        try {
            const response = await fetch(`${window.API}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ utilizador, senha })
            });
            
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
    // 4. VERIFICAÇÃO DE SESSÃO
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
    // 5. TESTE DE CONEXÃO
    // ============================================
    window.testarConexao = async function() {
        console.log(`🔍 Testando conexão com ${window.API}...`);
        
        const endpoints = ['/api/health', '/api/ping', '/api'];
        
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(`${window.API}${endpoint}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                if (response.ok) {
                    console.log(`✅ Backend conectado! (${endpoint})`);
                    return true;
                }
            } catch (e) {
                // Continua tentando outros endpoints
            }
        }
        
        console.error(`❌ Backend offline em ${window.API}`);
        return false;
    };
    
    // ============================================
    // 6. WEBSOCKET
    // ============================================
    let ws = null;
    let wsReconnectTimer = null;
    let wsMessageHandlers = [];
    
    window.initWebSocket = function(onMessageCallback) {
        const token = getToken();
        if (!token) {
            console.warn('⚠️ Sem token, não é possível conectar WebSocket');
            return null;
        }
        
        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log('WebSocket já conectado');
            return ws;
        }
        
        const wsUrl = `${window.WS_URL}?token=${token}`;
        console.log(`🔌 Conectando WebSocket: ${wsUrl}`);
        
        ws = new WebSocket(wsUrl);
        
        ws.onopen = () => {
            console.log('✅ WebSocket conectado');
            if (wsReconnectTimer) {
                clearTimeout(wsReconnectTimer);
                wsReconnectTimer = null;
            }
        };
        
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                wsMessageHandlers.forEach(handler => handler(data));
                if (onMessageCallback) onMessageCallback(data);
            } catch (e) {
                console.error('Erro ao processar mensagem WS:', e);
            }
        };
        
        ws.onclose = () => {
            console.log('🔌 WebSocket desconectado, tentando reconectar em 5s...');
            wsReconnectTimer = setTimeout(() => {
                window.initWebSocket(onMessageCallback);
            }, 5000);
        };
        
        ws.onerror = (error) => {
            console.error('❌ WebSocket erro:', error);
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
    
    window.onWSMessage = function(handler) {
        wsMessageHandlers.push(handler);
    };
    
    // ============================================
    // 7. TOAST GLOBAL
    // ============================================
    window.mostrarToast = function(mensagem, tipo = 'sucesso') {
        const toast = document.createElement('div');
        toast.textContent = mensagem;
        toast.className = `fixed bottom-5 right-5 z-50 px-4 py-2 rounded-lg shadow-lg text-white text-sm font-semibold ${
            tipo === 'sucesso' ? 'bg-green-600' : tipo === 'erro' ? 'bg-red-600' : 'bg-blue-600'
        } animate-bounce`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };
    
    window.toast = window.mostrarToast; // alias
    
    // ============================================
    // 8. AUTO-INICIALIZAÇÃO
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        // Testar conexão após 1 segundo
        setTimeout(() => {
            window.testarConexao();
        }, 1000);
        
        // Verificar sessão admin na página admin
        if (window.location.pathname.includes('admin.html') && 
            !window.location.pathname.includes('login-admin.html')) {
            const token = localStorage.getItem('adminToken');
            const logado = localStorage.getItem('adminLogado');
            if (!token || logado !== 'true') {
                window.location.href = 'login-admin.html';
            }
        }
    });
    
    console.log('✅ SchoolConnect: Backend connector pronto!');
})();