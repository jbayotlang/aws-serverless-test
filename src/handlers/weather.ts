import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { returnResponse, returnError } from './return';
import { isValidZip, isValidCountryCode, HttpException } from '../utils';
import { WeatherService } from '../services'


const mainHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { zip, countryCode } = event.queryStringParameters || {};

  if (!zip || !countryCode) {
    return returnError(new HttpException('Missing zip or countryCode in the request', 400));
  }

  if (!isValidZip(zip)) {
    return returnError(new HttpException('Invalid zip format', 400));
  }

  if (!isValidCountryCode(countryCode)) {
    return returnError(new HttpException('Invalid countryCode format', 400));
  }

  try {
    const weatherService = new WeatherService();
    const weather = await weatherService.getWeatherByZipAndCountryCode(zip, countryCode);
    return returnResponse(weather, 200);
  } catch (error) {
    return returnError(error)
  }
}

export const handler = mainHandler;
