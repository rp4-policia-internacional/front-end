class DetalhesFacade {
    constructor() {
        this.detalhesVitima = new DetalhesVitima();
        this.detalhesCriminoso = new DetalhesCriminoso();
    }

    async buscarDetalhesVitima(id, detalhesVitimaElement) {
        await this.detalhesVitima.buscarDetalhesVitima(id, detalhesVitimaElement); 
    }

    async buscarDetalhesCriminoso(id, detalhesCriminosoElement) {
        await this.detalhesCriminoso.buscarDetalhesCriminoso(id, detalhesCriminosoElement);
    }

    async removerVitima(id) {
        await this.detalhesVitima.removerVitima(id);
    }

    async removerCriminoso(id) {
        await this.detalhesCriminoso.removerCriminoso(id);
    }
}