(function () {
    console.log("🚀 SchoolConnect: Inicializando conector...");

    // ============================================
    // CONFIGURAÇÃO AUTOMÁTICA (LOCAL + RENDER)
    // ============================================
    const BACKEND_URL = (() => {
        if (window.location.hostname.includes('onrender.com')) {
            return 'https://schoolconnect-0ud2.onrender.com';
        }

        if (
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1'
        ) {
            return 'http://localhost:3000';
        }

        return window.location.origin;
    })();

    window.API = BACKEND_URL;
    window.API_URL = BACKEND_URL;
    window.BACKEND_URL = BACKEND_URL;

    console.log(`📍 Backend API: ${window.API}`);

    // ============================================
    // FUNÇÃO BASE DE FETCH (CORRIGIDA)
    // ============================================
    const getToken = () =>
        localStorage.getItem('adminToken') ||
        localStorage.getItem('token');

    window.apiFetch = async function (endpoint, options = {}) {
        const url = endpoint.startsWith('http')
            ? endpoint
            : window.API + endpoint;

        const token = getToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...(options.headers || {})
            }
        };

        if (options.body instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        try {
            const response = await fetch(url, config);

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error("❌ Resposta não é JSON:", text);
                throw new Error(
                    `Backend não devolveu JSON. Verifica rota: ${endpoint}`
                );
            }

            if (!response.ok) {
                throw new Error(data.error || data.message || `Erro ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`❌ Erro [${endpoint}]:`, error);
            throw error;
        }
    };

    // ============================================
    // MÉTODOS HTTP
    // ============================================
    window.apiGet = (e) => window.apiFetch(e);
    window.apiPost = (e, d) =>
        window.apiFetch(e, { method: 'POST', body: JSON.stringify(d) });

    window.apiPut = (e, d) =>
        window.apiFetch(e, { method: 'PUT', body: JSON.stringify(d) });

    window.apiDelete = (e) =>
        window.apiFetch(e, { method: 'DELETE' });

    // ============================================
    // LOGIN NORMAL (CORRIGIDO)
    // ============================================
    window.fazerLogin = async function (email, senha) {
        try {
            const data = await window.apiFetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, senha })
            });

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.removeItem('adminToken');
                return { success: true, data };
            }

            return { success: false, error: 'Token não recebido' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ============================================
    // LOGIN ADMIN
    // ============================================
    window.fazerLoginAdmin = async function (utilizador, senha) {
        try {
            const data = await window.apiFetch('/api/admin/login', {
                method: 'POST',
                body: JSON.stringify({ utilizador, senha })
            });

            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminLogado', 'true');
                localStorage.removeItem('token');
                return { success: true, data };
            }

            return { success: false, error: 'Token não recebido' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ============================================
    // TESTE BACKEND (SIMPLIFICADO E SEGURO)
    // ============================================
    window.testarConexao = async function () {
        try {
            await fetch(window.API + "/api");
            console.log("✅ Backend conectado");
            return true;
        } catch (e) {
            console.error("❌ Backend offline");
            return false;
        }
    };

    // ============================================
    // SESSÃO
    // ============================================
    window.estaLogado = () =>
        !!(localStorage.getItem('token') || localStorage.getItem('adminToken'));

    window.sair = function () {
        localStorage.clear();
        window.location.href = 'login.html';
    };

    // ============================================
    // AUTO INIT
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => window.testarConexao(), 1000);
    });

    console.log('✅ SchoolConnect connector pronto!');
})();