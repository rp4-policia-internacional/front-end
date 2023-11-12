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

