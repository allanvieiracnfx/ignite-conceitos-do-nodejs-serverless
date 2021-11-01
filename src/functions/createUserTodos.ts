
import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidV4 } from 'uuid';
import { document } from "../core/database/dynamodbClient";

type CreateTodosInput = {
  title: string;
  deadline: Date
}

type CreateTodosOutput = {
  statusCode: number;
  header: {
    'Content-Type': string
  };
  body: string;
}

export const handle: APIGatewayProxyHandler = async (event): Promise<CreateTodosOutput> => {
 
  const { title, deadline } = JSON.parse(event.body) as unknown as CreateTodosInput;
  const { userId: user_id } = event.pathParameters;

  const todo = {
      id: uuidV4(),
      user_id,
      title,
      done: false,
      deadline
  }

  await document.put({
    TableName: 'users_todos',
    Item: todo
  }).promise();

  return {
    statusCode: 201,
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Todos criado com sucesso!',
      response: todo
    })
  }
};
