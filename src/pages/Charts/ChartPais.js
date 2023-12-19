
class ChartPais {
  constructor(contextoDoGrafico, filtro) {
    this.contextoDoGrafico = contextoDoGrafico;
    this.filtro = filtro;
  }

  async buscandoDados(filtro) {
    try {
      const responseCriminosos = await axios.get(`http://localhost:3338/api/criminoso`);
      const responsePaises = await axios.get(`http://localhost:3340/api/pais`);
      let criminososFiltrados = responseCriminosos.data;
  
      if (filtro) {
        if (filtro.getGeneroSelecionado() !== 'todos') {
          criminososFiltrados = criminososFiltrados.filter((criminoso) => {
            return criminoso.genero === filtro.getGeneroSelecionado();
          });
        }
        if (filtro.getFaixaEtaria() !== 'todos') {
          criminososFiltrados = criminososFiltrados.filter((criminoso) => {
            return verificarFaixaEtaria(criminoso.idade, filtro.getFaixaEtaria());
          });
        }
      }
  
      return {
        criminosos: criminososFiltrados,
        paises: responsePaises.data,
      };
    } catch (error) {
      console.error('Erro ao buscar dados de criminosos e países:', error);
      return { criminosos: [], paises: [] };
    }
  }
  

  async chartCriminososPorPais(filtro) {
    try {

      let { criminosos, paises } = await this.buscandoDados(filtro);

      const criminososPorPais = criminosos.reduce((contagem, criminoso) => {
        const pais = criminoso.id_paisOrigem;

        // contagem de criminosos por gênero e país
        const nomePais = paises.find(paisObj => paisObj.id === pais)?.nome || `País ${pais}`;
        console.log(`Criminoso de gênero ${criminoso.genero} do país ${nomePais}`);

        contagem[pais] = contagem[pais] || { total: 0, generos: {} };
        contagem[pais].total += 1;

        if (criminoso.genero) {
          contagem[pais].generos[criminoso.genero] = (contagem[pais].generos[criminoso.genero] || 0) + 1;
        }

        return contagem;
      }, {});
      const result = Object.keys(criminososPorPais).map(paisId => {
        const nomePais = paises.find(pais => pais.id === paisId)?.nome || `País ${paisId}`;
        return { pais: nomePais, quantidade: criminososPorPais[paisId].total };
      });

      const labels = result.map(item => item.pais);
      const values = result.map(item => item.quantidade);

      new Chart(this.contextoDoGrafico, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Número de Criminosos por País',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Erro ao gerar o gráfico de criminosos por país:', error);
    }
  }
}
