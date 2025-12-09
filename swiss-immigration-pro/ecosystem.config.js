const path = require('path');

// Get the directory where this config file is located
const appDir = path.resolve(__dirname);
const userHome = process.env.HOME || process.env.USERPROFILE || '/home/deploy';
const logsDir = path.join(userHome, 'logs');

module.exports = {
  apps: [{
    name: 'swiss-immigration-pro',
    script: 'npm',
    args: 'start',
    cwd: appDir,
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: path.join(logsDir, 'err.log'),
    out_file: path.join(logsDir, 'out.log'),
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10
  }]
};





