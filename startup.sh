#!/usr/bin/env sh
./wait-for-command.sh -c 'aws --endpoint-url=http://localstack:4576 --region us-west-1 sqs list-queues' -s 0 -t 20 && $1