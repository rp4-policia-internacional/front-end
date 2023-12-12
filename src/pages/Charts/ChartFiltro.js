class ChartFiltro {
  constructor() {
    this.generoSelecionado = 'todos';
  }

  setGeneroSelecionado(genero) {
    this.generoSelecionado = genero;
  }

  getGeneroSelecionado() {
    return this.generoSelecionado;
  }
  setFaixaEtaria(faixaEtaria) {
    this.faixaEtaria = faixaEtaria;
  }

  setCapitalPais(capital) {
    this.capitalPais = capital;
  }

  setPaisEspecifico(pais) {
    this.paisEspecifico = pais;
  }
}
