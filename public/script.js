async function loadServers() {
    const response = await fetch('/servers');
    const data = await response.json();

    let serverSelect = document.getElementById('serverSelect');
    serverSelect.innerHTML = "";
    
    data.servers.forEach(server => {
        let option = document.createElement('option');
        option.value = server.name;
        option.textContent = server.name;
        serverSelect.appendChild(option);
    });

    loadCommands();
}

async function loadCommands() {
    const response = await fetch('/servers');
    const data = await response.json();

    let selectedServer = document.getElementById('serverSelect').value;
    let commandSelect = document.getElementById('commandSelect');
    commandSelect.innerHTML = "";

    let server = data.servers.find(s => s.name === selectedServer);
    if (server) {
        server.commands.forEach(cmd => {
            let option = document.createElement('option');
            option.value = cmd;
            option.textContent = cmd;
            commandSelect.appendChild(option);
        });
    }
}

async function executeCommand() {
    let server = document.getElementById('serverSelect').value;
    let command = document.getElementById('commandSelect').value;
    
    const response = await fetch('/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ server, command })
    });

    const result = await response.text();
    document.getElementById('logs').value = result;
}

document.getElementById('serverSelect').addEventListener('change', loadCommands);

window.onload = loadServers;
