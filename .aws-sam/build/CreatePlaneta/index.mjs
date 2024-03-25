import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  try {
    const planeta = JSON.parse(event.body);

    const newPlaneta = {
      ...planeta,
      id: planeta.id ?? crypto.randomUUID(),



    };
    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.PLANETAS_TABLE_NAME,
        Item: newPlaneta,
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify(newPlaneta),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};