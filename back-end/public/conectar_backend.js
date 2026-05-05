(function () {
    console.log("🚀 SchoolConnect: Conector iniciado");

    // ============================================
    // BASE URL (MESMO DOMÍNIO DO BACKEND)
    // ============================================
    const API_BASE = window.location.origin;

    window.API = API_BASE;
    console.log("📍 API base:", window.API);

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

        try {
            return JSON.parse(text);
        } catch (err) {
            console.error("❌ Resposta inválida do backend:", text);
            throw new Error("Resposta do backend não é JSON válido");
        }
    }

    // ============================================
    // FETCH CENTRAL (ROBUSTO)
    // ============================================
    window.apiFetch = async function (endpoint, options = {}) {
        const url = endpoint.startsWith("http")
            ? endpoint
            : `${window.API}${endpoint}`;

        const token = getToken();

        const config = {
            ...options,
            headers: {
                ...(options.body instanceof FormData
                    ? {}
                    : { "Content-Type": "application/json" }),

                ...(token && { Authorization: `Bearer ${token}` }),
                ...(options.headers || {})
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await parseJsonSafe(response);

            if (!response.ok) {
                throw new Error(data.error || data.message || "Erro na API");
            }

            return data;
        } catch (err) {
            console.error("❌ API error:", err.message);
            throw err;
        }
    };

    // ============================================
    // HELPERS HTTP
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
    // LOGIN NORMAL
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
        } catch (err) {
            return { success: false, error: err.message };
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
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // ============================================
    // TESTE DE CONEXÃO
    // ============================================
    window.testarConexao = async function () {
        try {
            const res = await fetch(`${window.API}/api`);
            const data = await res.json();

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

    window.sair = function () {
        localStorage.clear();
        window.location.href = "login.html";
    };

    // ============================================
    // INIT AUTOMÁTICO
    // ============================================
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => window.testarConexao(), 800);
    });

})();