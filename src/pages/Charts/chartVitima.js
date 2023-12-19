class ChartVitima {
  constructor(contextoDoGrafico, filtro) {
    this.contextoDoGrafico = contextoDoGrafico;
    this.filtro = filtro;
  }
  async buscandoDados(filtro) {
    try {
      const responseVitima = await axios.get(`http://localhost:3337/api/vitima`);
      let vitimasFiltrados = responseVitima.data;
  
      if (filtro) {
        if (filtro.getGeneroSelecionado() !== 'todos') {
          vitimasFiltrados = vitimasFiltrados.filter((vitima) => {
            return vitima.genero === filtro.getGeneroSelecionado();
          });
        }
        if (filtro.getFaixaEtaria() !== 'todos') {
          vitimasFiltrados = vitimasFiltrados.filter((vitima) => {
            return verificarFaixaEtaria(vitima.idade, filtro.getFaixaEtaria());
          });
        }
      }
  
      return vitimasFiltrados; 
    } catch (error) {
      console.error('Erro ao buscar dados de vítimas:', error);
      return [];
    }
  }
  
  async chartStatusDaVitima(filtro) {
    try {
      let vitimas = await this.buscandoDados(filtro);

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
            label: 'Status das vítimas',
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
    } catch (error) {
      console.error('Erro ao gerar o gráfico de status das vítimas:', error);
    }
  }
}





function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getMonth();

  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}

function verificarFaixaEtaria(idade, faixaEtaria) {
  switch (faixaEtaria) {
    case '18-25':
      return idade >= 18 && idade <= 25;
    case '26-35':
      return idade >= 26 && idade <= 35;
    case '36+':
      return idade >= 36;
    default:
      return true; // Se a faixa etária não for especificada, não aplicar filtro
  }
}
