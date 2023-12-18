
class ChartCriminoso {
    constructor(contextoDoGrafico, filtro) {
      this.contextoDoGrafico = contextoDoGrafico;
      this.filtro = filtro;
    }
   //busca os dados dos criminosos
   async buscandoDados() {
    try {
      const responseCriminosos = await axios.get(`http://localhost:3338/api/criminoso`);
     
      if (this.filtro && this.filtro.getGeneroSelecionado() !== 'todos') {
        const generoSelecionado = this.filtro.getGeneroSelecionado();
        const faixaEtariaSelecionada = this.filtro.getFaixaEtaria();
        
      
        const criminososFiltrados = responseCriminosos.data.filter(criminoso => criminoso.genero === generoSelecionado);

        if (faixaEtariaSelecionada !== 'todas') {
          // Adiciona a filtragem por faixa etária
          criminososFiltrados = criminososFiltrados.filter(criminoso => {
            const idade = calcularIdade(criminoso.dataNascimento); // Implemente a função calcularIdade
            return verificarFaixaEtaria(idade, faixaEtariaSelecionada); // Implemente a função verificarFaixaEtaria
          });
        }
        // Contagem de criminosos por gênero
        const contagemCriminososPorGenero = criminososFiltrados.reduce((contagem, criminoso) => {
          if (criminoso.genero) {
            contagem[criminoso.genero] = (contagem[criminoso.genero] || 0) + 1;
          }
          return contagem;
        }, {});
        console.log('Contagem de criminosos por gênero:', contagemCriminososPorGenero);

        return criminososFiltrados;
      } else {
        // Se não houver filtro de gênero, retorna todos os criminosos
        return responseCriminosos.data;
      }
    } catch (error) {
      console.error('Erro ao buscar dados de criminosos:', error);
      return [];
    }
  }
  


    //Tem uma verificação p ver se o filtro de genero esta ativo, os criminosos sao filtrados com base no genero slecionado antes de gerar o grafico
    async chartStatusDoCriminoso() {
      try {
        let criminosos = await this.buscandoDados(); 
       
        const statusCriminosos = criminosos.reduce((contagem, criminoso) => {
          const status = criminoso.status;
          contagem[status] = (contagem[status] || 0) + 1;
          return contagem;
        }, {});
  
        const result = Object.keys(statusCriminosos).map(status => ({ status, quantidade: statusCriminosos[status] }));
  
        const labels = result.map(item => item.status);
        const values = result.map(item => item.quantidade);
  
        console.log("criminoso", values);
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
  
    async chartParticipacaoOrganizacao() {
      try {
        //const criminosos = await this.buscandoDados();


      
        let criminosos = await this.buscandoDados();

        if (this.filtro && this.filtro.getGeneroSelecionado() !== 'todos') {
          criminosos = criminosos.filter(criminoso => criminoso.genero === this.filtro.getGeneroSelecionado());
      }



        const criminososComOrganizacao = criminosos.filter(criminoso => criminoso.id_organizacao);
        const organizacoes = await axios.get(`http://localhost:3338/api/organizacao`);
        const dadosOrganizacao = organizacoes.data;
        if (this.filtro && this.filtro.getGeneroSelecionado() !== 'todos') {
            criminosos = criminosos.filter(criminoso => criminoso.genero === this.filtro.getGeneroSelecionado());
          }
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