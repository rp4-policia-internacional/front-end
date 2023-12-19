
class ChartFiltro {
  constructor() {
    this.generoSelecionado = 'todos';
    this.faixaEtaria = 'todas';

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

  getFaixaEtaria() {
    return this.faixaEtaria;
  }

  setCapitalPais(capital) {
    this.capitalPais = capital;
  }

  setPaisEspecifico(pais) {
    this.paisEspecifico = pais;
  }
}
