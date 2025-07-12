#!/bin/bash
source /home/ec2-user/myapp/.env.prod

pkill -f 'java -jar /home/ec2-user/myapp/myapp.jar'
nohup java -jar /home/ec2-user/myapp/myapp.jar > /home/ec2-user/myapp/app.log 2>&1 &
echo "App restarted"
