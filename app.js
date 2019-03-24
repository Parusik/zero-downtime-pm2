const express = require('express');
const http = require('http');

const PORT = 3000;
const PID = process.pid;

const main = async () => {
    // APP
    const app = express();
    app.get('/', (req, res) => {
        res.send({pid:PID});
    });

    // Asynchronous initializing
    await new Promise((res) => setTimeout(res, 3000));

    // SERVER
    const server = http.createServer(app);
    await server.listen(PORT, () => {
        process.send('ready');
        console.log(`[${PID}] - [${new Date().toISOString()}] Server started at port: ${PORT}`)
    });

    const exit = () => {
        console.log(`[${PID}] - [${new Date().toISOString()}] Server closing...`);
        server.close((err) => {
            if (err) {
                console.error(err);
                process.exit(1)
            }
            console.log(`[${PID}] - [${new Date().toISOString()}] Server closed.`);
            process.exit(0)
        });

        // Force close server after 5 secs
        setTimeout((e) => {
            console.log(`[${PID}] - [${new Date().toISOString()}] Forcing server close!`, e);
            process.exit(1)
        }, 5000);
    };

    process.once('SIGHUP', exit);
    process.once('SIGINT', exit);
    process.once('SIGTERM', exit);

};


main();


