class ChartCriminoso {
    constructor(contextoDoGrafico) {
        this.contextoDoGrafico = contextoDoGrafico;
    }

    //busca os dados dos criminosos
    async buscandoDados() {
        try {
            const responseCriminosos = await axios.get(`http://localhost:3338/api/criminoso`);
            return responseCriminosos.data;
        } catch (error) {
            console.error('Erro ao buscar dados de criminosos:', error);
            return [];
        }
    }

    //gera um gráfico com a qtd de criminosos por status 
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
        });
    }


    //gera um gráfico de pizza mostra a qtd de distribuições  de criminosos nas organizações.
    async chartParticipacaoOrganizacao() {
        try {

            const criminosos = await this.buscandoDados();
            const criminososComOrganizacao = criminosos.filter(criminoso => criminoso.id_organizacao);
            const organizacoes = await axios.get(`http://localhost:3338/api/organizacao`);
            const dadosOrganizacao = organizacoes.data;

            // qtd de criminosos por organização
            const contagemPorOrganizacao = dadosOrganizacao.reduce((contagem, organizacao) => {
                // Filtragem dos criminosos que tao participondo da organização 
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
