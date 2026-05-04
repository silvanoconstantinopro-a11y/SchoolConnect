import { ServiceUsuario } from "../service/serviceUsuario.js";
import { uploadImagem }   from "../middlewares/upload.js";
import { handle }         from "./_base.js";

const PERFIL_MAP = { teacher: "PROFESSOR", parent: "ENCARREGADO" };
const normalizarPerfil = (p) => PERFIL_MAP[p] || p;

const normalizarDados = (body) => {
  const dados = { ...body };
  if (dados.perfil)          dados.perfil      = normalizarPerfil(dados.perfil);
  if (dados["disciplinas[]"]) { dados.disciplinas = [].concat(dados["disciplinas[]"]); delete dados["disciplinas[]"]; }
  if (dados["turmas[]"])      { dados.turmas      = [].concat(dados["turmas[]"]);      delete dados["turmas[]"];      }
  if (dados["cursos[]"])      { dados.cursos      = [].concat(dados["cursos[]"]);      delete dados["cursos[]"];      }
  return dados;
};

export class ControllerUsuarios {

  // POST /api/usuarios
  static criarUsuario = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = normalizarDados(req.body);
      if (req.file) dados.imagem = `/uploads/imagens/${req.file.filename}`;
      return ServiceUsuario.criarUsuario(dados);
    }, 201),
  ];

  // POST /api/login
  static login = handle(async (req) => {
    const { email, senha } = req.body;
    return ServiceUsuario.loginUsuario(email, senha);
  });

  // GET /api/usuarios
  static listarUsuarios = handle(async (req) => {
    const { perfil } = req.query;
    return ServiceUsuario.listarUsuarios({ perfil });
  });

  // GET /api/usuarios/:id
  static listarUsuarioPorId = handle(async (req) => {
    return ServiceUsuario.listarUsuarioPorId(req.params.id);
  });

  // PUT /api/usuarios/:id
  static atualizarUsuario = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = normalizarDados(req.body);
      if (req.file) dados.imagem = `/uploads/imagens/${req.file.filename}`;
      return ServiceUsuario.atualizarUsuario(req.params.id, dados);
    }),
  ];

  // DELETE /api/usuarios/:id
  static deletarUsuario = handle(async (req) => {
    return ServiceUsuario.deletarUsuario(req.params.id);
  });

  // POST /api/admin/codigos
  static criarCodigoProfessor = handle(async (req) => {
    return ServiceUsuario.criarCodigoProfessor(req.body.codigo);
  }, 201);

  // GET /api/admin/codigos
  static listarCodigosProfessor = handle(async () => {
    return ServiceUsuario.listarCodigosProfessor();
  });

  // DELETE /api/admin/codigos/:id
  static deletarCodigoProfessor = handle(async (req) => {
    return ServiceUsuario.deletarCodigoProfessor(req.params.id);
  });
}