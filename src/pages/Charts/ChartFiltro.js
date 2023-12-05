class ChartFiltro {
    constructor() {
        this.genero = null;
        this.faixaEtaria = null;
        this.capitalPais = null;
        this.paisEspecifico = null;
    }

    async genero() {
        const responseCriminoso = await axios.get('http://localhost:3338/api/criminoso/');
        const responseVitima = await axios.get('http://localhost:3337/api/vitima/');

        const generoSelect = document.getElementById('genero');
        generoSelect.innerHTML = '';

        [...responseCriminoso.data, ...responseVitima.data].forEach((opcao) => {
            const option = document.createElement('option');
            option.value = opcao.valor;
            option.text = opcao.texto;
            generoSelect.add(option);
        });
    }

    async faixaEtaria() {
        const responseCriminoso = await axios.get('http://localhost:3338/api/criminoso/');
        const responseVitima = await axios.get('http://localhost:3337/api/vitima/');

        const faixaEtariaSelect = document.getElementById('faixaEtaria');
        faixaEtariaSelect.innerHTML = '';

        [...responseCriminoso.data, ...responseVitima.data].forEach((opcao) => {
            const option = document.createElement('option');
            option.value = opcao.valor;
            option.text = opcao.texto;
            faixaEtariaSelect.add(option);
        });
    }

    async paisEspecifico() {
        const response = await axios.get('http://localhost:3340/api/pais');
        const paisEspecificoSelect = document.getElementById('paisEspecifico');

        paisEspecificoSelect.innerHTML = '';

        response.data.forEach((opcao) => {
            const option = document.createElement('option');
            option.value = opcao.valor;
            option.text = opcao.texto;
            paisEspecificoSelect.add(option);
        });
    }

    async capitalPais() {
        const response = await axios.get('http://localhost:3340/api/pais');
        const capitalPaisSelect = document.getElementById('capitalPais');

        capitalPaisSelect.innerHTML = '';

        response.data.forEach((opcao) => {
            const option = document.createElement('option');
            option.value = opcao.capital;
            option.text = opcao.texto;
            capitalPaisSelect.add(option);
        });
    }

    setGenero(genero) {
        this.genero = genero;
    }

    setFaixaEtaria(faixaEtaria) {
        this.faixaEtaria = faixaEtaria;
    }

    setCapitalPais(capital) {
        this.capitalPais = capital;
    }

    setPaisEspecifico(pais) {
        this.paisEspecifico = pais;
    }
}





