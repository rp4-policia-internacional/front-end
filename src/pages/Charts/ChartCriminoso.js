class ChartCriminoso {
    constructor(contextoDoGrafico) {
      this.contextoDoGrafico = contextoDoGrafico;
    }
  
    async buscandoDados() {
      try {
        const responseCriminosos = await axios.get(`http://localhost:3338/api/criminoso`);
        return responseCriminosos.data;
      } catch (error) {
        console.error('Erro ao buscar dados de criminosos:', error);
        return [];
      }
    }
  chartStatusDoCriminoso() {
      this.buscandoDados().then(criminosos => {
        const statusCriminosos = criminosos.reduce((contagem, criminoso) => {
          const status = criminoso.status;
          contagem[status] = (contagem[status] || 0) + 1;
          return contagem;
        }, {});
  
        const result = Object.keys(statusCriminosos).map(status => ({ status, quantidade: statusCriminosos[status] }));
  
        const labels = result.map(item => item.status);
        const values = result.map(item => item.quantidade);
  
        new Chart(this.contextoDoGrafico, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Status dos Criminosos',
              data: values,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
              },
            },
          },
        });
      });
    }
  }
  