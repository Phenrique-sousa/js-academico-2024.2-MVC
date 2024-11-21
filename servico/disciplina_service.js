class DisciplinaService {
  constructor(alunoService) {
    this.repositorio = new DisciplinaRepositorio();
    this.alunoService = alunoService;
  }
  inserir(codigo, nome) {
    const disciplinaPesquisada = this.pesquisarPorCodigo(codigo);
    if (disciplinaPesquisada.length > 0) {
      throw new Error("Código de disciplina já cadastrado!");
    }

    const disciplinaNova = new Disciplina(codigo, nome);
    this.repositorio.inserir(disciplinaNova);
    return disciplinaNova;
  }
  
  remover(codigo) {
    this.repositorio.remover(codigo);
  }
 
  pesquisarPorCodigo(codigo) {
    return this.repositorio
      .listar()
      .filter((disciplina) => disciplina.codigo === codigo);
  }

  inserirAlunoNaDisciplina(codigo, matricula) {
    const disciplinaPesquisada = this.pesquisarPorCodigo(codigo);
    if (disciplinaPesquisada.length < 1) {
      throw new Error("Disciplina não existente!");
    }

    const alunoPesquisado = this.alunoService.pesquisarPorMatricula(matricula);
    if (alunoPesquisado.length < 1) {
      throw new Error("Aluno não existente!");
    }

    const disciplina = disciplinaPesquisada[0];

    const alunoJaMatriculado = disciplina.alunos.some(aluno => aluno.matricula === matricula);
    if (alunoJaMatriculado){
      throw new Error("Aluno já participa da disciplina!");
    }

    const aluno = alunoPesquisado[0];

    disciplina.alunos.push(aluno);
  }

  listarAlunos(codigo) {
    const disciplina = this.pesquisarPorCodigo(codigo)[0];
    return disciplina.alunos;
  }
}
