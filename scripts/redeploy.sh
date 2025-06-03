#!/bin/bash

# Exit on error
set -e

# Create logs directory in home folder if it doesn't exist
mkdir -p ~/logs

# Get current date for log file name
CURRENT_DATE=$(date '+%Y-%m-%d')

# Log file path in home directory with date
LOG_FILE="$HOME/logs/deploy_${CURRENT_DATE}.log"

# Function to log messages with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Starting deployment process..."

log "Building the project..."
pnpm run build 2>&1 | tee -a "$LOG_FILE"

log "Restarting PM2 process..."
pm2 restart pest-control 2>&1 | tee -a "$LOG_FILE"

log "Deployment completed successfully!"
