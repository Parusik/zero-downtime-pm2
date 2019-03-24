module.exports = {
    "apps": [
        {
            "cwd": "./",
            "exec_mode": "cluster",
            "instances"  : 'max',
            "kill_timeout" : 3000,
            "listen_timeout" : 3000,
            "name": "app",
            "script": "app.link",
            "wait_ready": true
        }
    ]
};
