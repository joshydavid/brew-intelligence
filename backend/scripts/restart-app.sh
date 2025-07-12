#!/bin/bash
source /home/ec2-user/myapp/backend/target/.env.prod

JAR_PATH="/home/ec2-user/myapp/backend/target/brewintelligence-backend-0.0.1-SNAPSHOT.jar"
JAR_DIR="$(dirname "$JAR_PATH")"
LOG_FILE="$JAR_DIR/brewintelligence-backend-0.0.1-SNAPSHOT.log"

pkill -f "java -jar $JAR_PATH"
nohup java -jar "$JAR_PATH" > "$LOG_FILE" 2>&1 &
echo "App restarted. Logs: $LOG_FILE"
