
//Uma fachada para exconder a complexidade interna do sistema.

class ChartFacade {
    constructor(contextoChartPais, contextoChartCriminosos, contextoChartVitima, contextoChartCriminosoOrganizacao) {
        this.chartPais = new ChartPais(contextoChartPais);
        this.chartCriminoso = new ChartCriminoso(contextoChartCriminosos);
        this.chartVitima = new ChartVitima(contextoChartVitima);
        this.chartCriminosoOrganizacao = new ChartCriminoso(contextoChartCriminosoOrganizacao);
    }


    // Este método chama todos os charts 
    async charts() {
        await this.chartPais.chartCriminososPorPais();
        await this.chartVitima.chartStatusDaVitima();
        await this.chartCriminoso.chartStatusDoCriminoso();
        await this.chartCriminosoOrganizacao.chartParticipacaoOrganizacao();
    }
}
