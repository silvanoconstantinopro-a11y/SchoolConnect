import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceStats {

  static async getStats() {
    const [usuarios, cursos, alunos, avisos, eventos, reunioes, turmas, disciplinas] =
      await Promise.all([
        prisma.usuario.findMany(),
        prisma.curso.count(),
        prisma.aluno.count(),
        prisma.aviso.count(),
        prisma.evento.count(),
        prisma.reuniao.count(),
        prisma.turma.count(),
        prisma.disciplina.count(),
      ]);

    return {
      usuarios:     usuarios.length,
      professores:  usuarios.filter(u => u.perfil === "PROFESSOR").length,
      encarregados: usuarios.filter(u => u.perfil === "ENCARREGADO").length,
      cursos, alunos, avisos, eventos, reunioes, turmas, disciplinas,
    };
  }

  static async listarUsuarios() {
    const lista = await prisma.usuario.findMany({ include: { disciplinas: true, turmas: true } });
    return lista.map(({ senha, ...r }) => r);
  }

  static listarCursos()    { return prisma.curso.findMany(); }
  static listarAlunos()    { return prisma.aluno.findMany(); }
  static listarAvisos()    { return prisma.aviso.findMany({ orderBy: { criadoEm: "desc" } }); }
  static listarEventos()   { return prisma.evento.findMany({ orderBy: { criadoEm: "desc" } }); }
  static listarReunioes()  { return prisma.reuniao.findMany({ orderBy: { criadoEm: "desc" } }); }
  static listarTurmas()    { return prisma.turma.findMany(); }
}