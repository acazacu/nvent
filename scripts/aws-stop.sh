#!/bin/bash
instances=$(aws ec2 describe-instances --filters 'Name=tag-key, Values=NventDev' --query 'Reservations[*].{InstanceId:Instances[0].InstanceId}' --output text | tr '\n' ' ')
aws ec2 stop-instances --instance-ids ${instances} --query 'StoppingInstances[*].{InstanceId:InstanceId,State:CurrentState.Name}' --output table
aws ec2 wait instance-stopped --instance-ids ${instances}
aws ec2 describe-instances --query 'Reservations[*].Instances[0].{InstanceId:InstanceId,Name:Tags[?Key==`Name`] | [0].Value,State:State.Name}' --output table
