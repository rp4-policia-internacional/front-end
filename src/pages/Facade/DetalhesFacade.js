class DetalhesFacade {
    constructor() {
        this.detalhesVitima = new DetalhesVitima();
        this.detalhesCriminoso = new DetalhesCriminoso();
    }

    async buscarDetalhes(id, detalhesVitimaElement, detalhesCriminosoElement){
    await this.detalhesVitima.buscarDetalhesVitima(id, detalhesVitimaElement); 
    await this.detalhesCriminoso.buscarDetalhesCriminoso(id, detalhesCriminosoElement);
    }
   
    async remover(id){
        await this.detalhesVitima.removerVitima(id);
        await this.detalhesCriminoso.removerCriminoso(id);
    }

}