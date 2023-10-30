document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbarContainer");
    navbarContainer.innerHTML = ""; // Limpa qualquer conteúdo existente
    const navbarFrame = document.createElement("iframe");
    navbarFrame.src = "../../shared/components/header.html";
    navbarFrame.style.width = "100%";
    navbarFrame.style.height = "50px";
    navbarContainer.appendChild(navbarFrame);
});