const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

const serversFile = 'servers.json';
const logFile = 'logs/server.log';

// Get servers list
app.get('/servers', (req, res) => {
    const data = fs.readFileSync(serversFile);
    res.json(JSON.parse(data));
});

// Execute command
app.post('/execute', (req, res) => {
    const { server, command } = req.body;

    const restrictedCommands = ['rm', 'del', 'erase', 'move', 'chmod', 'chown', 'truncate'];
    if (restrictedCommands.some(cmd => command.includes(cmd))) {
        return res.status(400).send('Error: Restricted command detected.');
    }

    exec(command, { shell: 'cmd.exe' }, (error, stdout, stderr) => {
        let logEntry = `[${new Date().toISOString()}] Executed: ${command} on ${server}\n`;
        logEntry += error ? `Error: ${stderr}\n` : `Output: ${stdout}\n`;
        
        fs.appendFileSync(logFile, logEntry);
        res.send(logEntry);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
