// Classe que diminui a complexidade do html detalhesCriminoso.html
class DetalhesCriminoso {
    async buscarDetalhesCriminoso(id, detalhesCriminosoElement) {
        try {

            console.log('Elemento detalhesCriminosoElement:', detalhesCriminosoElement);
            const response = await axios.get(`http://localhost:3338/api/criminoso/${id}`);
            console.log('Resposta da API:', response.data);
            const criminoso = response.data;
            const organizacaoId = criminoso.id_organizacao;
            const organizacao = organizacaoId ? await this.buscarOrganizacao(organizacaoId) : 'Organização não disponível';
            const paisDeOrigem = await this.getPaisById(criminoso.id_paisDeOrigem);
           
            const dataFormatada = await this.dataNascimentoFormatada(criminoso.dataNascimento);

            detalhesCriminosoElement.innerHTML = `
                <div class="mt-3">
                    <p><strong>Nome Completo:</strong> ${criminoso.nomeCompleto}</p>
                    <p><strong>Altura:</strong> ${criminoso.altura}</p>
                    <p><strong>Idade:</strong> ${criminoso.idade} anos</p>
                    <p><strong>Data de Nascimento:</strong> ${dataFormatada}</p>
                    <p><strong>País de Origem:</strong> ${paisDeOrigem}</p>
                   
                    <p><strong>Gênero:</strong> ${criminoso.genero}</p>
                    <p><strong>País Visto por Último:</strong> ${await this.getPaisVistoPorUltimoById(criminoso.id_paisVistoPorUltimo)}</p>
                    <p><strong>Apelido:</strong> ${criminoso.apelido}</p>
                    <p><strong>Descrição do criminoso:</strong> ${criminoso.caracteristicas}</p>
                    <p><strong>Status:</strong> ${criminoso.status}</p>
                    <p><strong>Organização:</strong> ${organizacao}</p>
                </div>
            `;
        } catch (error) {
            console.error('Erro ao buscar detalhes do criminoso:', error);
        }
    }

    async removerCriminoso(id) {
        try {
            await axios.delete(`http://localhost:3338/api/criminoso/${id}`);
            alert('Criminoso removido com sucesso!');
            window.location.href = 'listarCriminoso.html';
        } catch (error) {
            console.error('Erro ao remover criminoso:', error);
        }
    }


    async buscarOrganizacao(idOrganizacao) {
        try {
            const response = await axios.get(`http://localhost:3338/api/organizacao/${idOrganizacao}`);
            return response.data.nome;
        } catch (error) {
            console.error('Erro ao buscar organização:', error);
            throw error;
        }
    }

    async dataNascimentoFormatada(dataString) {
        const data = new Date(dataString);
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1;
        const dia = data.getDate() + 1;
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
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



    async getPaisVistoPorUltimoById(id) {
        try {
            const response = await axios.get(`http://localhost:3340/api/pais/${id}`);
            return response.data.nome;
        } catch (error) {
            console.error('Erro ao buscar país visto por ultimo: ', error);
            return 'País não encontrado';
        }
    }
}



