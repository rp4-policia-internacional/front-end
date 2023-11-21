class ChartFacade{

    constructor(contextoChartPais, contextoChartCriminosos){

        this.chartPais = new ChartPais(contextoChartPais);
        this.chartCriminoso = new ChartCriminoso(contextoChartCriminosos);
    }

    async charts(){
        await this.chartPais.chartCriminososPorPais();
        await this.chartCriminoso.chartStatusDoCriminoso();
    }

}