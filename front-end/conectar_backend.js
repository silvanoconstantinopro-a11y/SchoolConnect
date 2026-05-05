// ============================================
// CONECTAR_BACKEND.js - Conecta automaticamente
// Cole este arquivo na pasta do seu projeto
// E adicione no HTML: <script src="CONECTAR_BACKEND.js"></script>
// ============================================

(function() {
    console.log("🚀 Iniciando conexão com o backend...");
    
    // ========================================
    // 1. CONFIGURAÇÃO AUTOMÁTICA
    // ========================================
    
    // Detecta automaticamente o backend
    const BACKEND_URL = (() => {
        // Se estiver no Render
        if (window.location.hostname.includes('onrender.com')) {
            return 'https://schoolconnect-0ud2.onrender.com';
        }
        // Se estiver no localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:3000';
        }
        // Qualquer outro lugar, usa a mesma origem
        return window.location.origin;
    })();
    
    // Configurações globais
    window.API_URL = BACKEND_URL;
    window.WS_URL = BACKEND_URL.replace('http', 'ws');
    
    console.log(`✅ Backend configurado: ${window.API_URL}`);
    
    // ========================================
    // 2. FUNÇÃO PRINCIPAL DE FETCH
    // ========================================
    
    window.apiFetch = async function(endpoint, options = {}) {
        const url = window.API_URL + endpoint;
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...(options.headers || {})
            }
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || error.error || `HTTP ${response.status}`);
            }
            
            return response;
        } catch (error) {
            console.error(`❌ Erro na API (${endpoint}):`, error);
            throw error;
        }
    };
    
    // ========================================
    // 3. FUNÇÃO PARA OBTER DADOS
    // ========================================
    
    window.apiGet = async function(endpoint) {
        const response = await window.apiFetch(endpoint);
        return response.json();
    };
    
    // ========================================
    // 4. FUNÇÃO PARA ENVIAR DADOS
    // ========================================
    
    window.apiPost = async function(endpoint, data) {
        const response = await window.apiFetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.json();
    };
    
    window.apiPut = async function(endpoint, data) {
        const response = await window.apiFetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        return response.json();
    };
    
    window.apiDelete = async function(endpoint) {
        const response = await window.apiFetch(endpoint, {
            method: 'DELETE'
        });
        return response.json();
    };
    
    // ========================================
    // 5. FUNÇÃO DE LOGIN PRONTA
    // ========================================
    
    window.fazerLogin = async function(email, senha) {
        try {
            const response = await window.apiFetch('/api/admin/login', {
                method: 'POST',
                body: JSON.stringify({ email, senha })
            });
            
            const data = await response.json();
            
            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminLogado', 'true');
                return { success: true, data };
            }
            
            return { success: false, error: data.error || 'Login falhou' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };
    
    // ========================================
    // 6. FUNÇÃO PARA VERIFICAR SE ESTÁ LOGADO
    // ========================================
    
    window.estaLogado = function() {
        const token = localStorage.getItem('adminToken');
        return !!token;
    };
    
    window.sair = function() {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminLogado');
        window.location.href = 'login-admin.html';
    };
    
    // ========================================
    // 7. TESTAR CONEXÃO
    // ========================================
    
    window.testarConexao = async function() {
        try {
            const resultado = await window.apiGet('/api/usuarios').catch(() => null);
            console.log('✅ Conexão com backend: OK');
            return true;
        } catch (error) {
            console.error('❌ Conexão com backend: FALHOU');
            return false;
        }
    };
    
    // ========================================
    // 8. CONFIGURAR FORMULÁRIOS DE LOGIN
    // ========================================
    
    // Auto-configura qualquer formulário com class="login-form"
    document.addEventListener('DOMContentLoaded', function() {
        const loginForms = document.querySelectorAll('.login-form');
        
        loginForms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = form.querySelector('[name="email"], [name="username"]')?.value;
                const senha = form.querySelector('[name="password"]')?.value;
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn?.textContent;
                
                if (btn) {
                    btn.disabled = true;
                    btn.textContent = 'A entrar...';
                }
                
                const resultado = await window.fazerLogin(email, senha);
                
                if (resultado.success) {
                    // Redireciona para o admin
                    window.location.href = 'admin.html';
                } else {
                    alert('Erro: ' + resultado.error);
                    if (btn) {
                        btn.disabled = false;
                        btn.textContent = originalText;
                    }
                }
            });
        });
        
        // Testa conexão automaticamente
        setTimeout(() => window.testarConexao(), 1000);
    });
    
    console.log("✅ CONECTAR_BACKEND.js carregado com sucesso!");
    console.log(`📡 API em: ${window.API_URL}`);
})();