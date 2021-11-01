
import { document } from "../core/database/dynamodbClient";
import { APIGatewayProxyHandler } from "aws-lambda";

type ListTodosOutput = {
  statusCode: number;
  header: {
    'Content-Type': string
  };
  body: string;
}

export const handle: APIGatewayProxyHandler = async (event): Promise<ListTodosOutput> => {
  const { userId: user_id } = event.pathParameters;

  const userTodos = await document
    .scan({
        TableName: 'users_todos',
        FilterExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
          ":user_id": user_id
        }
    })
    .promise();

  return {
    statusCode: 200,
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      todos: userTodos
    })
  }
};
