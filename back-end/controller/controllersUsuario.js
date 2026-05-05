import { ServiceUsuario } from "../service/serviceUsuario.js";
import { uploadImagem } from "../middlewares/upload.js";
import { handle } from "./_base.js";

const PERFIL_MAP = { teacher: "PROFESSOR", parent: "ENCARREGADO" };
const normalizarPerfil = (p) => PERFIL_MAP[p] || p;

const normalizarDados = (body) => {
  const dados = { ...body };
  if (dados.perfil) dados.perfil = normalizarPerfil(dados.perfil);
  if (dados["disciplinas[]"]) { dados.disciplinas = [].concat(dados["disciplinas[]"]); delete dados["disciplinas[]"]; }
  if (dados["turmas[]"]) { dados.turmas = [].concat(dados["turmas[]"]); delete dados["turmas[]"]; }
  if (dados["cursos[]"]) { dados.cursos = [].concat(dados["cursos[]"]); delete dados["cursos[]"]; }
  return dados;
};

export class ControllerUsuarios {

  static criarUsuario = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = normalizarDados(req.body);
      if (req.file) dados.imagem = `/uploads/imagens/${req.file.filename}`;
      return ServiceUsuario.criarUsuario(dados);
    }, 201),
  ];

  static login = handle(async (req) => {
    const { email, senha } = req.body;
    if (!email || !senha) throw new Error("Email e senha são obrigatórios");
    return ServiceUsuario.loginUsuario(email, senha);
  });

  static listarUsuarios = handle(async (req) => {
    const { perfil } = req.query;
    return ServiceUsuario.listarUsuarios({ perfil });
  });

  static listarUsuarioPorId = handle(async (req) => {
    return ServiceUsuario.listarUsuarioPorId(req.params.id);
  });

  static atualizarUsuario = [
    uploadImagem.single("imagem"),
    handle(async (req) => {
      const dados = normalizarDados(req.body);
      if (req.file) dados.imagem = `/uploads/imagens/${req.file.filename}`;
      return ServiceUsuario.atualizarUsuario(req.params.id, dados);
    }),
  ];

  static deletarUsuario = handle(async (req) => {
    return ServiceUsuario.deletarUsuario(req.params.id);
  });

  static criarCodigoProfessor = handle(async (req) => {
    const { codigo } = req.body;
    if (!codigo) throw new Error("Código é obrigatório");
    return ServiceUsuario.criarCodigoProfessor(codigo);
  }, 201);

  static listarCodigosProfessor = handle(async (req) => {
    return ServiceUsuario.listarCodigosProfessor();
  });

  static deletarCodigoProfessor = handle(async (req) => {
    return ServiceUsuario.deletarCodigoProfessor(req.params.id);
  });
}