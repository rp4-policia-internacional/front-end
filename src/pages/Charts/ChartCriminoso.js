
class ChartCriminoso {
  constructor(contextoDoGrafico, filtro) {
    this.contextoDoGrafico = contextoDoGrafico;
    this.filtro = filtro;
    this.chart = null; 
  }
  async buscandoDados(filtro) {
    try {
      const responseCriminosos = await axios.get(`http://localhost:3338/api/criminoso`);
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
  
      return criminososFiltrados;
    } catch (error) {
      console.error('Erro ao buscar dados de criminosos:', error);
      return [];
    }
  }
  


  //Tem uma verificação p ver se o filtro de genero esta ativo, os criminosos sao filtrados com base no genero slecionado antes de gerar o grafico
  async chartStatusDoCriminoso(filtro) {

    try {



      let criminosos = await this.buscandoDados(filtro);

      // Filtrar criminosos por faixa etária
      const criminosos18_25 = criminosos.filter(criminoso => verificarFaixaEtaria(criminoso.idade, '18-25'));
      const criminosos26_35 = criminosos.filter(criminoso => verificarFaixaEtaria(criminoso.idade, '26-35'));
      const criminosos36Mais = criminosos.filter(criminoso => verificarFaixaEtaria(criminoso.idade, '36+'));

      // Contagem de criminosos por faixa etária
      console.log('Criminosos na faixa etária 18-25:', criminosos18_25.length);
      console.log('Criminosos na faixa etária 26-35:', criminosos26_35.length);
      console.log('Criminosos na faixa etária 36+:', criminosos36Mais.length);




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
  
    } catch (error) {
      console.error('Erro ao gerar o gráfico de status dos criminosos:', error);
    }
  }

  async chartParticipacaoOrganizacao(filtro) {
    try {

      let criminosos = await this.buscandoDados(filtro);

      const criminososComOrganizacao = criminosos.filter(criminoso => criminoso.id_organizacao);
      const organizacoes = await axios.get(`http://localhost:3338/api/organizacao`);
      const dadosOrganizacao = organizacoes.data;
     

      // qtd de criminosos por organização
      const contagemPorOrganizacao = dadosOrganizacao.reduce((contagem, organizacao) => {
        // Filtragem dos criminosos que estão participando da organização
        const criminososNaOrganizacao = criminososComOrganizacao.filter(criminoso => criminoso.id_organizacao === organizacao.id);
        //  contagem para a organização
        contagem[organizacao.nome] = criminososNaOrganizacao.length;
        return contagem;
      }, {});

      const labels = Object.keys(contagemPorOrganizacao);
      const values = Object.values(contagemPorOrganizacao);

      console.log("organização", values);
     

   

      new Chart(this.contextoDoGrafico, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          }],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Quantidade de criminosos nas organizações ',
          },
        },
      });
    } catch (error) {
      console.error('Erro ao gerar o gráfico de participação em organizações:', error);
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
