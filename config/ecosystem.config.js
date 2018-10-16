module.exports = {
  apps: [{
    name: "muzika-intro",
    script: "./server.js",
    max_memory_restart: "1G",
    env: {
      "PORT": 18081,
      "MUZIKA_ENV": "stage",
      "instances": 0,
      "exec_mode": "cluster"
    },
    env_production: {
      "PORT": 18081,
      "MUZIKA_ENV": "production",
      "instances": 0,
      "exec_mode": "cluster"
    }
  }]
};
