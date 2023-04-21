import { APIGatewayProxyResult } from 'aws-lambda';
import { HttpException } from '../utils/httpException';

export const returnResponse = (response: any, statusCode: number): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(response),
  };
};

export const returnError = (error: HttpException): APIGatewayProxyResult => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  return returnResponse({ message }, statusCode);
};
