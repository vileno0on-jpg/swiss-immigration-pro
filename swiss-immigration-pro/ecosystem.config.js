module.exports = {
  apps: [{
    name: 'swiss-immigration-pro',
    script: 'npm',
    args: 'start',
    cwd: '/home/deploy/swiss-immigration-pro',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/home/deploy/logs/err.log',
    out_file: '/home/deploy/logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10
  }]
};





