class DisciplinaControlador {
  constructor(controladorAluno) {
    const alunoService = controladorAluno.servico;
    this.servico = new DisciplinaService(alunoService);
  }
  inserir() {
    const codigoElemento = document.querySelector("#codigo");
    const nomeDisciplinaElemento = document.querySelector("#nome_disciplina");

    const disciplinaInserida = this.servico.inserir(
      codigoElemento.value,
      nomeDisciplinaElemento.value
    );
    const listaDisciplinasElemento =
      document.querySelector("#lista_disciplinas");
    if (disciplinaInserida) {
      this.inserirDisciplinaNoHtml(
        disciplinaInserida,
        listaDisciplinasElemento
      );
    }
  }

  inserirDisciplinaNoHtml(disciplina, elementoDestino) {
    const disciplinaElemento = document.createElement("li");
    disciplinaElemento.textContent = `Código: ${disciplina.codigo} - Nome: ${disciplina.nome}`;
    elementoDestino.appendChild(disciplinaElemento);
  }

  inserirAlunoEmDisciplina() {
    const codigoInserir = document.querySelector("#inserir_codigo").value;
    const matriculaInserir = document.querySelector("#inserir_matricula").value;
    this.servico.inserirAlunoNaDisciplina(codigoInserir, matriculaInserir);
    this.listarAlunosNoHtml(codigoInserir);
  }

  listarAlunosNoHtml(codigo) {
    const nome = this.servico.pesquisarPorCodigo(codigo)[0].nome;
    let listaDeAlunos = this.servico.listarAlunos(codigo);
    const inserirOutput = document.querySelector("#inserir_output");
    const listaOutput = document.querySelector("#lista_output");
    listaDeAlunos = listaDeAlunos.map((aluno) => aluno.nome);
    const htmlTurma = `
    <br/>
      <b>Código: ${codigo}</b><br/>
      <b>Disciplina: ${nome}</b>`;
    inserirOutput.innerHTML = htmlTurma;
    let htmlAlunos = "";
    listaDeAlunos.forEach((aluno) => {
      htmlAlunos += `<li>${aluno}</li>`;
    });
    listaOutput.innerHTML = htmlAlunos;
  }
}
