(function () {
    console.log("🚀 Iniciando conexão com backend...");

    // ===============================
    // 1. CONFIGURAÇÃO AUTOMÁTICA
    // ===============================
    const BACKEND_URL = (() => {
        if (window.location.hostname.includes('onrender.com')) {
            return 'https://schoolconnect-0ud2.onrender.com';
        }

        if (
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1'
        ) {
            return 'http://localhost:3002';
        }

        return window.location.origin;
    })();

    window.API_URL = BACKEND_URL;

    // 🔥 WebSocket seguro (HTTP / HTTPS automático)
    window.WS_URL = window.location.protocol === "https:"
        ? BACKEND_URL.replace("https", "wss")
        : BACKEND_URL.replace("http", "ws");

    console.log(`✅ API: ${window.API_URL}`);
    console.log(`🔌 WS: ${window.WS_URL}`);

    // ===============================
    // 2. FETCH BASE
    // ===============================
    window.apiFetch = async function (endpoint, options = {}) {
        try {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('token');

            const response = await fetch(window.API_URL + endpoint, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                    ...(options.headers || {})
                }
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || data.error || "Erro na requisição");
            }

            return data;
        } catch (error) {
            console.error("❌ API error:", error);
            throw error;
        }
    };

    // ===============================
    // 3. HELPERS
    // ===============================
    window.apiGet = (e) => window.apiFetch(e);
    window.apiPost = (e, d) => window.apiFetch(e, { method: "POST", body: JSON.stringify(d) });
    window.apiPut = (e, d) => window.apiFetch(e, { method: "PUT", body: JSON.stringify(d) });
    window.apiDelete = (e) => window.apiFetch(e, { method: "DELETE" });

    // ===============================
    // 4. LOGIN FLEXÍVEL
    // ===============================
    window.fazerLogin = async function (endpoint, email, senha) {
        try {
            const data = await window.apiFetch(endpoint, {
                method: "POST",
                body: JSON.stringify({ email, senha })
            });

            if (data.token) {
                localStorage.setItem("token", data.token);
                return { success: true, data };
            }

            return { success: false, error: data.message || "Login falhou" };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ===============================
    // 5. LOGIN CHECK
    // ===============================
    window.estaLogado = () => !!localStorage.getItem("token");

    window.sair = function () {
        localStorage.clear();
        window.location.href = "login.html";
    };

    // ===============================
    // 6. TESTE DE CONEXÃO
    // ===============================
    window.testarConexao = async function () {
        try {
            await window.apiGet("/api");
            console.log("✅ Backend conectado");
            return true;
        } catch {
            console.error("❌ Backend offline");
            return false;
        }
    };

    // ===============================
    // 7. AUTO LOGIN FORM
    // ===============================
    document.addEventListener("DOMContentLoaded", () => {
        const forms = document.querySelectorAll(".login-form");

        forms.forEach((form) => {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const email = form.querySelector('[name="email"]')?.value;
                const senha = form.querySelector('[name="password"]')?.value;
                const btn = form.querySelector("button");

                if (btn) {
                    btn.disabled = true;
                    btn.textContent = "A entrar...";
                }

                const result = await window.fazerLogin("/api/admin/login", email, senha);

                if (result.success) {
                    window.location.href = "admin.html";
                } else {
                    alert(result.error);

                    if (btn) {
                        btn.disabled = false;
                        btn.textContent = "Entrar";
                    }
                }
            });
        });

        setTimeout(() => window.testarConexao(), 1000);
    });

    console.log("✅ Backend connector pronto!");
})();