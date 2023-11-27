
const socket = io('http://localhost:8080', { transports: ['websocket'] });


socket.on('socketId', (data) => {
    console.log('Mensagem recebida:', JSON.stringify(data));


    showNotification('Nova mensagem', "blab");
});


function showNotification(title, body) {
    
    if (!("Notification" in window)) {
        console.log('Esse navegador não suporta notificações desktop');
    } else {
    
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
    
                const notification = new Notification(title, {body});
                console.log(notification)

                notification.onclick = (e) => {
                    e.preventDefault();
                    window.focus();
                    notification.close();
                };
            }
        });
    }
}