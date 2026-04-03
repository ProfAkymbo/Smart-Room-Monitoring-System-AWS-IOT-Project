# Smart-Room-Monitoring-System-AWS-IOT-
This project demonstrates a simple IoT-based room monitoring system for hospitality use cases.  It shows how room sensors send data to the cloud, where it is processed and displayed on a dashboard in near real-time.
## Step 1 : Built-in MQTT Test Client
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
## Step 5 : Simulate Device Data
Use IoT Core MQTT test client:
Go to MQTT test client
Publish message:
Topic:
hotel/room/101
Payload:
{
 "room_id": "101",
 "occupancy": true,
 "motion": true
}
This simulates your device!
## Step 6 : Verify Data in DynamoDB
Check your table for
{
 "room_id": "101",
 "occupancy": true,
 "motion": true,
 "updated_at": "timestamp"
}
## Step 7 : Create API to Fetch Data
We’ll expose the DynamoDB data via an API using:
Amazon API Gateway + AWS Lambda
### 7.1 Create a new Lambda (Read Data)
Create a second Lambda:
Name: getRoomStatus
Paste the read data lambda function code
### 7.2 Give it permission
Same as before:
Attach AmazonDynamoDBFullAccess
(or least priviledge permission)
### 7.3 Create API Gateway
Open Amazon API Gateway
Click Create API
Choose HTTP API (simpler)
Add integration → select getRoomStatus Lambda
Add route:
mtethod is GET,  /rooms
Deploy
You’ll get a URL like:
https://abc123.execute-api.region.amazonaws.com/rooms
### 7.4 Test your API
Paste URL in browser
You should see:
[
 {
   "room_id": { "S": "101" },
   "occupancy": { "BOOL": true },
   "motion": { "BOOL": true }
 }
]
## STEP 8 : Simple Dashboard
Now let’s display it.

### 8.1 Create a simple HTML file
Create index.html file and paste the html code
### 8.2 Run it
Double-click the file
OR
Use Live Server (VS Code)
## Conclusion
you’ll see
![Dashboard](./images/logo.png)
Room list
Status:
🔴 Occupied
🟢 Vacant
Updates every 3 seconds
you can also send fresh data:
{ "room_id": "101", "occupancy": true, "motion": true }
Dashboard turns RED

Then send:
{ "room_id": "101", "occupancy": false, "motion": false }
Dashboard turns GREEN

