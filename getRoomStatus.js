import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async () => {
   const data = await client.send(new ScanCommand({
       TableName: "RoomStatus"
   }));

   return {
       statusCode: 200,
       headers: {
           "Access-Control-Allow-Origin": "*"
       },
       body: JSON.stringify(data.Items)
   };
};
