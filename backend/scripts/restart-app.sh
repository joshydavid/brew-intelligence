#!/bin/bash
source /home/ec2-user/myapp/.env.prod

pkill -f 'java -jar /home/ec2-user/myapp/brewintelligence-backend-0.0.1-SNAPSHOT.jar'
nohup java -jar /home/ec2-user/myapp/brewintelligence-backend-0.0.1-SNAPSHOT.jar > /home/ec2-user/myapp/brewintelligence-backend-0.0.1-SNAPSHOT.jar.log 2>&1 &
echo "App restarted"
