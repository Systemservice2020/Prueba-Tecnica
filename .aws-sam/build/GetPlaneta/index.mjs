import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  try {
    const id=event.pathParameters.id;

    const command= new GetCommand({
      TableName: process.env.PLANETAS_TABLE_NAME,
      Key: {id}
    });

    const response = await ddbDocClient.send(command);

    if(response.Item){
      console.log(JSON.stringify(response.Item));
      return {
        statusCode: 200,
        body: JSON.stringify({
          item: response.Item
        }),
      };
    }else{
      console.log('No item found');
      return {
        statusCode: 404,
        body: 'Item not found'
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};