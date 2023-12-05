
class GerenciadorDeEstatistica {
  constructor(totalCriminososElement, totalRepatriacaoElement, totalVitimasElement, totalExtradicoesElement) {
    this.totais = {
      criminosos: 0,
      vitimas: 0,
      extradicoes: 0,
      repatriacao: 0,
    };

    this.totalCriminososElement = totalCriminososElement;
    this.totalRepatriacaoElement = totalRepatriacaoElement;
    this.totalVitimasElement = totalVitimasElement;
    this.totalExtradicoesElement = totalExtradicoesElement;
  } async atualizarTotais() {
    try {
      const responseCriminosos = await axios.get('http://localhost:3338/api/criminoso');
      const responseVitimas = await axios.get('http://localhost:3337/api/vitima');
      const responseExtradicacoes = await axios.get('http://localhost:3336/api/extradicao');
      const responseRepatriacao = await axios.get('http://localhost:3342/api/repatriacao');


      console.log('TOTAL Criminosos:', responseCriminosos.data);
      console.log('TOTAL Vítimas:', responseVitimas.data);
      console.log('TOTAL Extradição:', responseExtradicacoes.data);
      console.log('TOTAL Repatriação:', responseRepatriacao.data);

      this.totais = {
        criminosos: responseCriminosos.data.length,
        vitimas: responseVitimas.data.length,
        extradicoes: responseExtradicacoes.data.length,
        repatriacao: responseRepatriacao.data.length,
      };


      this.atualizarTotaisUI();
    } catch (error) {
      console.error('Erro ao buscar totais:', error);
    }
  }


  atualizarTotaisUI() {

    if (this.totalCriminososElement) {
      this.totalCriminososElement.innerText = `Total de criminosos: ${this.totais.criminosos}`;
    }

    if (this.totalRepatriacaoElement) {
      this.totalRepatriacaoElement.innerText = `Total de repatriacao: ${this.totais.repatriacao}`;
    }

    if (this.totalVitimasElement) {
      this.totalVitimasElement.innerText = `Total de vítimas: ${this.totais.vitimas}`;
    }

    if (this.totalExtradicoesElement) {
      this.totalExtradicoesElement.innerText = `Total de Extradições: ${this.totais.extradicoes}`;
    }
  }

  getTotalCriminosos() {
    return this.totais.criminosos;
  }

  getTotalVitimas() {
    return this.totais.vitimas;
  }

  getTotalExtradicoes() {
    return this.totais.extradicoes;
  }

  getTotalRepatriacao() {
    return this.totais.repatriacao;
  }
}

