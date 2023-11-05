// Evento de clique para carregar páginas
/*document.addEventListener('DOMContentLoaded', () => {
    loadPage('src/pages/captura/index.html'); // Carrega a página inicial automaticamente

    // Adicione eventos de clique para outros links de navegação
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const page = event.target.getAttribute('href');
            loadPage(page);
        });
    });
});*/

document.addEventListener('DOMContentLoaded', () => {
    loadPage('src/pages/vitima/cadastroVittima.html'); // Carrega a página inicial automaticamente

    // Adicione eventos de clique para outros links de navegação
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const page = event.target.getAttribute('href');
            loadPage(page);
        });
    });
});

function getData(url, callback) {
    axios.get(url)
    .then(function (response) {
        callback(response.data);
    })
    .catch(function (error) {
        console.error('Erro ao buscar dados: ', error);
    });
 }

 
 function getVitima(vitima) {
    const url = `http://localhost:3337/api/vitima/${vitima.id_vitima}`;
    getData(url, function (data) {
        console.log(data);
        $('#nomeVitima').text(`${data.nomeCompleto}`);
 
        // buscar o nome do país com base no id
        const pais = await getPaisById(data.id_paisVistoPorUltimo);
        $('#nomePaisResgatada').text(pais.nome);
    });
 }

 
 async function getDataById(baseUrl, id) {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
        throw error;
    }
}


async function getPaisById(id) {
    const baseUrl = 'http://localhost:3340/api/pais';
    return await getDataById(baseUrl, id);
}
