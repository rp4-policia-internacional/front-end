class ChartPais {
    constructor(contextoDoGrafico) {
        this.contextoDoGrafico = contextoDoGrafico;
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

    chartCriminososPorPais() {
        this.buscandoDados().then(({ criminosos, paises }) => {
            const criminososPorPais = criminosos.reduce((contagem, criminoso) => {
                const pais = criminoso.id_paisOrigem;
                contagem[pais] = (contagem[pais] || 0) + 1;
                return contagem;
            }, {});

            const result = Object.keys(criminososPorPais).map(paisId => {
                const nomePais = paises.find(pais => pais.id === paisId)?.nome || `País ${paisId}`;
                return { pais: nomePais, quantidade: criminososPorPais[paisId] };
            });

            const labels = result.map(item => item.pais);
            const values = result.map(item => item.quantidade);
            console.log("pais", values);

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
        });
    }
}
