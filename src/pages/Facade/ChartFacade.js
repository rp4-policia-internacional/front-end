
//Uma fachada para exconder a complexidade interna do sistema.

class ChartFacade {
    constructor(contextoChartPais, contextoChartCriminosos, contextoChartVitima, contextoChartCriminosoOrganizacao, totalCriminososElement, totalRepatriacaoElement, totalVitimasElement, totalExtradicoesElement, filtro) {
        this.chartPais = new ChartPais(contextoChartPais);
        this.chartCriminoso = new ChartCriminoso(contextoChartCriminosos);
        this.chartVitima = new ChartVitima(contextoChartVitima);
        this.chartCriminosoOrganizacao = new ChartCriminoso(contextoChartCriminosoOrganizacao);
        this.gerenciadorEstatistico = new GerenciadorDeEstatistica(
            totalCriminososElement,
            totalRepatriacaoElement,
            totalVitimasElement,
            totalExtradicoesElement
        );
        this.filtro = filtro;
    }
    async charts() {
        await this.chartPais.chartCriminososPorPais();
        await this.chartVitima.chartStatusDaVitima();
        await this.chartCriminoso.chartStatusDoCriminoso();
        await this.chartCriminosoOrganizacao.chartParticipacaoOrganizacao();
        await this.gerenciadorEstatistico.atualizarTotais();
    }
}
