#!/bin/bash
instances=$(aws ec2 describe-instances --filters 'Name=tag-key, Values=NventDev' --query 'Reservations[*].{InstanceId:Instances[0].InstanceId}' --output text | tr '\n' ' ')
aws ec2 start-instances --instance-ids ${instances} --query 'StartingInstances[*].{InstanceId:InstanceId,State:CurrentState.Name}' > /dev/null
aws ec2 wait instance-status-ok --instance-ids ${instances}
aws ec2 describe-instances --query 'Reservations[*].Instances[0].{InstanceId:InstanceId,Name:Tags[?Key==`Name`] | [0].Value,State:State.Name}' --output table
aws ecs update-service --cluster drone --service drone-server --force-new-deployment > /dev/null
aws ecs update-service --cluster drone --service drone-agent --force-new-deployment > /dev/null
aws ecs describe-services --cluster drone --services drone-agent drone-server --query 'services[*].{Name:serviceName,Desired:desiredCount,pending:pendingCound,running:runningCount}' --output table

