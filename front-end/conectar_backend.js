// conectar_backend.js - Versão CORRIGIDA (porta 3000)
(function () {
    console.log("🚀 SchoolConnect: Inicializando conector do backend...");

    // ============================================
    // 1. CONFIGURAÇÃO AUTOMÁTICA DA URL (PORTA 3000)
    // ============================================
    const getBackendURL = () => {
        // Se já estiver definido, usa
        if (window.__BACKEND_URL__) return window.__BACKEND_URL__;
        
        const host = window.location.hostname;
        
        // Render.com (produção)
        if (host.includes('onrender.com')) {
            return 'https://schoolconnect-0ud2.onrender.com';
        }
        
        // Localhost (desenvolvimento) - PORTA 3000
        if (host === 'localhost' || host === '127.0.0.1') {
            // Se a página veio da porta 3000, usa a mesma origem
            if (window.location.port === '3000') {
                return window.location.origin;
            }
            return 'http://localhost:3000';  // <--- PORTACORRIGIDA: 3000
        }
        
        return window.location.origin;
    };

    const BACKEND_URL = getBackendURL();
    
    // Define todas as variáveis
    window.API = BACKEND_URL;
    window.API_URL = BACKEND_URL;
    window.BACKEND_URL = BACKEND_URL;
    window.__BACKEND_URL__ = BACKEND_URL;
    
    // WebSocket URL (porta 3000)
    window.WS_URL = window.location.protocol === "https:"
        ? BACKEND_URL.replace("https", "wss")
        : BACKEND_URL.replace("http", "ws");
    
    console.log(`📍 API Configurada: ${window.API}`);
    console.log(`🔌 WS Configurado: ${window.WS_URL}`);

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
        
        // Se for FormData, remove o Content-Type
        if (options.body instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        
        try {
            console.log(`📡 Requisição: ${url}`);
            const response = await fetch(url, config);
            
            // Verifica se a resposta é HTML (erro comum)
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                throw new Error(`Servidor retornou HTML. Verifique se o backend está a correr em ${window.API}`);
            }
            
            // Tenta fazer parse do JSON
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
    // 3. FUNÇÃO DE LOGIN ADMIN
    // ============================================
    window.fazerLoginAdmin = async function(utilizador, senha) {
        console.log(`🔐 Login admin em: ${window.API}/api/admin/login`);
        
        try {
            const response = await fetch(`${window.API}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ utilizador, senha })
            });
            
            // Verifica se a resposta é HTML
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                const text = await response.text();
                console.error('Resposta HTML:', text.substring(0, 200));
                throw new Error(`Backend não está a responder corretamente. Verifique se o servidor está a correr em ${window.API}`);
            }
            
            let data;
            try {
                data = await response.json();
            } catch (e) {
                throw new Error('Resposta inválida do servidor. O endpoint /api/admin/login pode não existir.');
            }
            
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
    // 4. FUNÇÃO DE LOGIN NORMAL
    // ============================================
    window.fazerLogin = async function(email, senha) {
        console.log(`🔐 Login em: ${window.API}/api/login`);
        
        try {
            const response = await fetch(`${window.API}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha })
            });
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                throw new Error(`Backend não está a responder corretamente.`);
            }
            
            let data;
            try {
                data = await response.json();
            } catch (e) {
                throw new Error('Resposta inválida do servidor.');
            }
            
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
    // 5. TESTE DE CONEXÃO
    // ============================================
    window.testarConexao = async function() {
        console.log(`🔍 Testando conexão com ${window.API}...`);
        
        try {
            const response = await fetch(`${window.API}/api/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Backend conectado!', data);
                return true;
            }
            
            // Fallback: tenta /api
            const fallbackResponse = await fetch(`${window.API}/api`);
            if (fallbackResponse.ok) {
                console.log('✅ Backend conectado (via /api)!');
                return true;
            }
            
            throw new Error('Backend não responde');
        } catch (error) {
            console.error('❌ Backend offline:', error.message);
            return false;
        }
    };
    
    // ============================================
    // 6. VERIFICAR SESSÃO ADMIN
    // ============================================
    window.verificarSessaoAdmin = function() {
        const adminToken = localStorage.getItem('adminToken');
        const adminLogado = localStorage.getItem('adminLogado');
        
        if (!adminToken || adminLogado !== 'true') {
            if (window.location.pathname.includes('admin.html') && 
                !window.location.pathname.includes('login-admin.html')) {
                window.location.href = 'login-admin.html';
            }
            return false;
        }
        return true;
    };
    
    // ============================================
    // 7. AUTO-INICIALIZAÇÃO
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.testarConexao();
        }, 1000);
        
        if (window.location.pathname.includes('admin.html') && 
            !window.location.pathname.includes('login-admin.html')) {
            window.verificarSessaoAdmin();
        }
    });
    
    console.log('✅ SchoolConnect: Backend connector pronto!');
})();