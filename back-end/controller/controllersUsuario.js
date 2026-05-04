import { ServiceUsuario } from "../service/serviceUsuario.js";
import { upload }         from "../middlewares/upload.js";

export class ControllerUsuarios {

  // POST /api/usuarios  (multipart — imagem opcional)
  static criarUsuario = [
    upload.single("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };

        // Normalizar perfil (front-end pode enviar "teacher" | "parent")
        const perfilMap = { teacher: "PROFESSOR", parent: "ENCARREGADO" };
        dados.perfil = perfilMap[dados.perfil] || dados.perfil;

        // Arrays enviados como "disciplinas[]"
        if (dados["disciplinas[]"]) {
          dados.disciplinas = [].concat(dados["disciplinas[]"]);
          delete dados["disciplinas[]"];
        }
        if (dados["turmas[]"]) {
          dados.turmas = [].concat(dados["turmas[]"]);
          delete dados["turmas[]"];
        }

        if (req.file) dados.imagem = req.file.filename;

        const usuario = await ServiceUsuario.criarUsuario(dados);
        return res.status(201).json(usuario);
      } catch (e) {
        return res.status(400).json({ error: e.message });
      }
    },
  ];

  // POST /api/login
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const result = await ServiceUsuario.loginUsuario(email, senha);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  // GET /api/usuarios
  static async listarUsuarios(req, res) {
    try {
      return res.json(await ServiceUsuario.listarUsuarios());
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // GET /api/usuarios/:id
  static async listarUsuarioPorId(req, res) {
    try {
      return res.json(await ServiceUsuario.listarUsuarioPorId(req.params.id));
    } catch (e) {
      const status = e.message.includes("não encontrado") ? 404 : 500;
      return res.status(status).json({ error: e.message });
    }
  }

  // PUT /api/usuarios/:id  (multipart — imagem opcional)
  static atualizarUsuario = [
    upload.single("imagem"),
    async (req, res) => {
      try {
        const dados = { ...req.body };
        const perfilMap = { teacher: "PROFESSOR", parent: "ENCARREGADO" };
        if (dados.perfil) dados.perfil = perfilMap[dados.perfil] || dados.perfil;
        if (req.file) dados.imagem = req.file.filename;
        return res.json(await ServiceUsuario.atualizarUsuario(req.params.id, dados));
      } catch (e) {
        const status = e.message.includes("não encontrado") ? 404 : 400;
        return res.status(status).json({ error: e.message });
      }
    },
  ];

  // DELETE /api/usuarios/:id
  static async deletarUsuario(req, res) {
    try {
      return res.json(await ServiceUsuario.deletarUsuario(req.params.id));
    } catch (e) {
      const status = e.message.includes("não encontrado") ? 404 : 500;
      return res.status(status).json({ error: e.message });
    }
  }

  // POST /api/admin/codigos
  static async criarCodigoProfessor(req, res) {
    try {
      return res.status(201).json(await ServiceUsuario.criarCodigoProfessor(req.body.codigo));
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  // GET /api/admin/codigos
  static async listarCodigosProfessor(req, res) {
    try {
      return res.json(await ServiceUsuario.listarCodigosProfessor());
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}