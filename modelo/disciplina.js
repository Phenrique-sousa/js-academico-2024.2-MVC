class Disciplina {
  constructor(codigoDisciplina, nomeDisciplina) {
    this._codigo = codigoDisciplina;
    this._nome = nomeDisciplina;
    this.alunos = [];
  }
  get codigo() {
    return this._codigo;
  }
  get nome() {
    return this._nome;
  }
  set nome(novoNome) {
    this._nome = novoNome;
  }
}
