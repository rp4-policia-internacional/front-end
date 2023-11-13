
class Facade {
    constructor() {
    
    }

    async buscarDetalhesVitima(id, detalhesVitimaElement) {
        try {
            const response = await axios.get(`http://localhost:3337/api/vitima/${id}`);
            const vitima = response.data;

            //const paisVitoPorUltimo = await this.getPaisVitoPorUltimoById(vitima.id_paisVistoPorUltimo);
            const paisVitoPorUltimo = vitima.id_paisVistoPorUltimo
            ? await this.getPaisVitoPorUltimoById(vitima.id_paisVistoPorUltimo)
            : 'País não disponível';

            const paisDeOrigem = await this.getPaisById(vitima.id_paisDeOrigem);
            const nacionalidade = await this.getNacionalidadeById(vitima.nacionalidade);

           
            detalhesVitimaElement.innerHTML = `
                <div class="mt-3">
                    <p><strong>Nome Completo:</strong> ${vitima.nomeCompleto}</p>
                    <p><strong>País de Origem:</strong> ${paisDeOrigem}</p>
                    <p><strong>Autor do Crime:</strong> ${vitima.id_autorDoCrime}</p>
                    <p><strong>Nacionalidade:</strong> ${nacionalidade}</p>
                    <p><strong>Altura:</strong> ${vitima.altura}</p>
                    <p><strong>Gênero:</strong> ${vitima.genero}</p>
                    <p><strong>Idade:</strong> ${vitima.idade} anos</p>
                    <p><strong>País Visto por Último:</strong> ${paisVitoPorUltimo}
                </div>
            `;
        } catch (error) {
            console.error('Erro ao buscar detalhes da vítima:', error);
        }
    }

    async removerVitima(id) {
        try {
            await axios.delete(`http://localhost:3337/api/vitima/${id}`);
            alert('Vítima removida com sucesso!');
            window.location.href = 'listaDeVitima.html';
        } catch (error) {
            console.error('Erro ao remover vítima:', error);
        }
    }

    async getPaisById(id) {
        try {
            const response = await axios.get(`http://localhost:3340/api/pais/${id}`);
            const pais = response.data;

            return pais ? pais.nome : 'País não encontrado';
        } catch (error) {
            console.error('Erro ao buscar país: ', error);
            return 'País não encontrado';
        }
    }


    async getNacionalidadeById(id) {
        try {
            const response = await axios.get(`http://localhost:3340/api/pais/${id}`);
            return response.data.gentilico;
        } catch (error) {
            console.error('Erro ao buscar nacionalidade: ', error);
            return 'Nacionalidade não encontrada';
        }
    }

    async getCriminosoById(id) {
        try {
            const response = await axios.get(`http://localhost:3338/api/criminoso/${id}`);
            return response.data.nomeCompleto;
        } catch (error) {
            console.error('Erro ao buscar criminoso: ', error);
            return 'Criminoso não encontrada';
        }
    }

    async getPaisVitoPorUltimoById(id) {
        try {
            const response = await axios.get(`http://localhost:3340/api/pais/${id}`);
            return response.data.nome;
        } catch (error) {
            console.error('Erro ao buscar país visto por ultimo: ', error);
            return 'País não encontrado';
        }
    }
    
}

