(function () {
    console.log("🚀 SchoolConnect: Conector iniciado");

    // ============================================
    // CONFIGURAÇÃO AUTOMÁTICA
    // ============================================
    const BACKEND_URL =
        window.location.hostname.includes("onrender.com")
            ? "https://schoolconnect-0ud2.onrender.com"
            : "http://localhost:3000";

    window.API = BACKEND_URL;

    console.log("📍 API:", window.API);

    // ============================================
    // FETCH BASE ROBUSTO
    // ============================================
    const getToken = () =>
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

    async function safeJson(response) {
        const text = await response.text();

        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("❌ Resposta inválida do backend:", text);
            throw new Error("Backend não devolveu JSON válido");
        }
    }

    window.apiFetch = async function (endpoint, options = {}) {
        const url = endpoint.startsWith("http")
            ? endpoint
            : window.API + endpoint;

        const token = getToken();

        const config = {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...(options.headers || {})
            }
        };

        if (options.body instanceof FormData) {
            delete config.headers["Content-Type"];
        }

        try {
            const res = await fetch(url, config);
            const data = await safeJson(res);

            if (!res.ok) {
                throw new Error(data.error || data.message || "Erro na API");
            }

            return data;
        } catch (err) {
            console.error("❌ API error:", err.message);
            throw err;
        }
    };

    // ============================================
    // MÉTODOS
    // ============================================
    window.apiGet = (e) => window.apiFetch(e);

    window.apiPost = (e, d) =>
        window.apiFetch(e, {
            method: "POST",
            body: JSON.stringify(d)
        });

    window.apiPut = (e, d) =>
        window.apiFetch(e, {
            method: "PUT",
            body: JSON.stringify(d)
        });

    window.apiDelete = (e) =>
        window.apiFetch(e, { method: "DELETE" });

    // ============================================
    // LOGIN NORMAL (IMPORTANTE)
    // ============================================
    window.fazerLogin = async function (email, senha) {
        try {
            const data = await window.apiFetch("/api/login", {
                method: "POST",
                body: JSON.stringify({ email, senha })
            });

            if (data.token) {
                localStorage.setItem("token", data.token);
                return { success: true, data };
            }

            return { success: false, error: "Token não recebido" };
        } catch (e) {
            return { success: false, error: e.message };
        }
    };

    // ============================================
    // LOGIN ADMIN
    // ============================================
    window.fazerLoginAdmin = async function (utilizador, senha) {
        try {
            const data = await window.apiFetch("/api/admin/login", {
                method: "POST",
                body: JSON.stringify({ utilizador, senha })
            });

            if (data.token) {
                localStorage.setItem("adminToken", data.token);
                return { success: true, data };
            }

            return { success: false, error: "Token não recebido" };
        } catch (e) {
            return { success: false, error: e.message };
        }
    };

    // ============================================
    // TESTE BACKEND
    // ============================================
    window.testarConexao = async function () {
        try {
            const res = await fetch(window.API + "/api");
            const data = await res.json();
            console.log("✅ Backend OK:", data);
            return true;
        } catch {
            console.error("❌ Backend offline");
            return false;
        }
    };

    // ============================================
    // SESSÃO
    // ============================================
    window.estaLogado = () =>
        !!(localStorage.getItem("token") || localStorage.getItem("adminToken"));

    window.sair = function () {
        localStorage.clear();
        window.location.href = "login.html";
    };

    // ============================================
    // INIT
    // ============================================
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => window.testarConexao(), 800);
    });

})();