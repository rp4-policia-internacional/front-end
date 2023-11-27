class ChartVitima {
  constructor(contextoDoGrafico) {
    this.contextoDoGrafico = contextoDoGrafico;
  }

  //busca dados da api vitima
  async buscandoDados() {
    try {
      const responseVitima = await axios.get(`http://localhost:3337/api/vitima`);
      return responseVitima.data;
    } catch (error) {
      console.error('Erro ao buscar dados de vitimas:', error);
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
