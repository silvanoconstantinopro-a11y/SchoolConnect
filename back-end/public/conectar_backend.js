(function () {
    console.log("🚀 SchoolConnect: Conector iniciado");

    // ============================================
    // BASE URL (LOCAL + PRODUÇÃO)
    // ============================================
    const API_BASE =
        window.location.hostname.includes("localhost")
            ? "http://localhost:3000"
            : "https://schoolconnect-0ud2.onrender.com"; // <- FIX para produção

    window.API = API_BASE;
    window.API_BASE_URL = API_BASE;

    // WebSocket compatível
    window.WS = API_BASE.replace("http", "ws");

    console.log("📍 API base:", API_BASE);

    // ============================================
    // TOKEN HELPER
    // ============================================
    const getToken = () =>
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

    // ============================================
    // SAFE JSON PARSER
    // ============================================
    async function parseJsonSafe(response) {
        const text = await response.text();

        if (!text) return {};

        try {
            return JSON.parse(text);
        } catch (err) {
            console.error("❌ JSON inválido:", text);
            throw new Error("Resposta do backend não é JSON válido");
        }
    }

    // ============================================
    // FETCH CENTRAL (API ÚNICA)
    // ============================================
    window.apiFetch = async function (endpoint, options = {}) {
        const url = endpoint.startsWith("http")
            ? endpoint
            : `${API_BASE}${endpoint}`;

        const token = getToken();
        const isFormData = options.body instanceof FormData;

        const config = {
            ...options,
            headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...(token && { Authorization: `Bearer ${token}` }),
                ...(options.headers || {})
            }
        };

        const response = await fetch(url, config);
        const data = await parseJsonSafe(response);

        if (!response.ok) {
            throw new Error(data.error || data.message || "Erro na API");
        }

        return data;
    };

    // ============================================
    // HELPERS HTTP
    // ============================================
    window.apiGet = (e) => apiFetch(e);

    window.apiPost = (e, d) =>
        apiFetch(e, {
            method: "POST",
            body: JSON.stringify(d)
        });

    window.apiPostForm = (e, f) =>
        apiFetch(e, {
            method: "POST",
            body: f
        });

    window.apiPut = (e, d) =>
        apiFetch(e, {
            method: "PUT",
            body: JSON.stringify(d)
        });

    window.apiDelete = (e) =>
        apiFetch(e, { method: "DELETE" });

    // ============================================
    // LOGIN NORMAL
    // ============================================
    window.fazerLogin = async function (email, senha) {
        try {
            const data = await apiPost("/api/login", { email, senha });

            if (data.token) {
                localStorage.setItem("token", data.token);
                return { success: true, data };
            }

            return { success: false, error: "Token não recebido" };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // ============================================
    // LOGIN ADMIN
    // ============================================
    window.fazerLoginAdmin = async function (utilizador, senha) {
        try {
            const data = await apiPost("/api/admin/login", {
                utilizador,
                senha
            });

            if (data.token) {
                localStorage.setItem("adminToken", data.token);
                return { success: true, data };
            }

            return { success: false, error: "Token não recebido" };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // ============================================
    // REGISTO
    // ============================================
    window.registarUsuario = async function (formData) {
        return apiPostForm("/api/usuarios", formData);
    };

    // ============================================
    // DADOS DINÂMICOS
    // ============================================
    window.getDisciplinas = () => apiGet("/api/disciplinas");
    window.getTurmas = () => apiGet("/api/turmas");
    window.getCursos = () => apiGet("/api/cursos");

    // ============================================
    // TESTE DE CONEXÃO
    // ============================================
    window.testarConexao = async function () {
        try {
            const data = await apiFetch("/api");
            console.log("✅ Backend OK:", data);
            return true;
        } catch (err) {
            console.error("❌ Backend offline:", err.message);
            return false;
        }
    };

    // ============================================
    // SESSÃO
    // ============================================
    window.estaLogado = () =>
        !!(localStorage.getItem("token") || localStorage.getItem("adminToken"));

    window.getUsuario = () => {
        try {
            return JSON.parse(localStorage.getItem("usuario"));
        } catch {
            return null;
        }
    };

    window.sair = function () {
        localStorage.clear();
        window.location.href = "login.html";
    };

    // ============================================
    // ERROS GLOBAIS
    // ============================================
    window.addEventListener("unhandledrejection", (e) => {
        console.error("🔥 Erro não tratado:", e.reason);
    });

    // ============================================
    // INIT AUTOMÁTICO
    // ============================================
    document.addEventListener("DOMContentLoaded", () => {
        console.log("⚡ DOM carregado");

        setTimeout(() => {
            window.testarConexao();
        }, 500);
    });

})();