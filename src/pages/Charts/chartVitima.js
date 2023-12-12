
class ChartVitima {
  constructor(contextoDoGrafico, filtro) {
    this.contextoDoGrafico = contextoDoGrafico;
    this.filtro = filtro;
  }
  async buscandoDados() {
    try {
      const responseVitima = await axios.get(`http://localhost:3337/api/vitima`);

      if (this.filtro && this.filtro.getGeneroSelecionado() !== 'todos') {
        const generoSelecionado = this.filtro.getGeneroSelecionado();

        const vitimasFiltradas = responseVitima.data.filter(vitima => vitima.genero === generoSelecionado);

        // contagem de vítimas por gênero
        const contagemVitimasPorGenero = vitimasFiltradas.reduce((contagem, vitima) => {
          if (vitima.genero) {
            contagem[vitima.genero] = (contagem[vitima.genero] || 0) + 1;
          }
          return contagem;
        }, {});
        console.log('Contagem de vítimas por gênero:', contagemVitimasPorGenero);

        return vitimasFiltradas;
      } else {
        return responseVitima.data;
      }
    } catch (error) {
      console.error('Erro ao buscar dados de vítimas:', error);
      return [];
    }
  }


  //gera um gráfico de pie para qtd de vitimas por status 
  chartStatusDaVitima() {
    this.buscandoDados().then(vitimas => {
      const statusVitimas = vitimas.reduce((contagem, vitima) => {
        const status = vitima.statusDaVitima;
        contagem[status] = (contagem[status] || 0) + 1;
        return contagem;
      }, {});
      // Contagem de vítimas por gênero
      const contagemVitimasPorGenero = vitimas.reduce((contagem, vitima) => {
        const genero = vitima.genero;
        contagem[genero] = (contagem[genero] || 0) + 1;
        return contagem;
      }, {});
      console.log('Contagem de vítimas por gênero:', contagemVitimasPorGenero);

      const result = Object.keys(statusVitimas).map(status => ({ status, quantidade: statusVitimas[status] }));

      const labels = result.map(item => item.status);
      const values = result.map(item => item.quantidade);
      console.log("vitima", values);

      new Chart(this.contextoDoGrafico, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Status dos vitimas',
            data: values,
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,

          scales: {
            y: {
              beginAtZero: true,
              suggestedMin: 0,
            },
          },
          title: {
            display: true,
            text: 'Status da Vítima',
          },
        },
      });
    });
  }
}
