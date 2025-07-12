#!/bin/bash
source /home/ec2-user/myapp/.env.prod

pkill -f 'java -jar /home/ec2-user/myapp/backend/target/brewintelligence-backend-0.0.1-SNAPSHOT.jar'
nohup java -jar /home/ec2-user/myapp/backend/target/brewintelligence-backend-0.0.1-SNAPSHOT.jar > /home/ec2-user/myapp/backend/target/brewintelligence-backend-0.0.1-SNAPSHOT.log 2>&1 &
echo "App restarted"
