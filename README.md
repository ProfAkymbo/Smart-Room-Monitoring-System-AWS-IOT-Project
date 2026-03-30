# Smart-Room-Monitoring-System-AWS-IOT-
This project demonstrates a simple IoT-based room monitoring system for hospitality use cases.  It shows how room sensors send data to the cloud, where it is processed and displayed on a dashboard in near real-time.
## Step 1 : Built-in MQTT Test Client (NO certificates needed)
This is what you’re using for your project to simulate the IOT device.
It works because:
You are already logged into AWS Console
AWS trusts your session
So we can publish messages WITHOUT certificates/ real devices connection
## Step 2 : Create DynamoDB Table
In Amazon DynamoDB:
Table name: RoomStatus
Partition key: room_id (String)
This stores latest room state
## Step 3 : Create Lambda Function
In AWS Lambda:
Name: processRoomData
Runtime: Node.js
paste the lambda function code to process data to be stored in database
## Step 4 : Connect IoT Core → Lambda
In IoT Core:
Go to Message Routing → Rules
Create rule:
SQL:
SELECT * FROM 'hotel/room/101'
Add the Lambda function → processRoomData
Now every message triggers Lambda
## Step 5 : 
