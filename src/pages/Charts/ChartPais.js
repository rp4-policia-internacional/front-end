
class ChartPais {
    constructor(contextoDoGrafico, filtro) {
      this.contextoDoGrafico = contextoDoGrafico;
      this.filtro = filtro;
    }
  
    async buscandoDados() {
      try {
        const responseCriminosos = await axios.get(`http://localhost:3338/api/criminoso`);
        const responsePaises = await axios.get(`http://localhost:3340/api/pais`);
        return {
          criminosos: responseCriminosos.data,
          paises: responsePaises.data,
        };
      } catch (error) {
        console.error('Erro ao buscar dados de criminosos e países:', error);
        return { criminosos: [], paises: [] };
      }
    }
  
    async chartCriminososPorPais() {
      try {
        let { criminosos, paises } = await this.buscandoDados();
  
        if (this.filtro && this.filtro.getGeneroSelecionado() !== 'todos') {
          criminosos = criminosos.filter(criminoso => criminoso.genero === this.filtro.getGeneroSelecionado());
        }
  
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
  