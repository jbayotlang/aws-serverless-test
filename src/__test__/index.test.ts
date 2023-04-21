import { handler } from '../handlers/weather';
import { APIGatewayProxyEvent } from 'aws-lambda';

const mockGetWeatherByZipAndCountryCode = jest.fn();

jest.mock('../services/weather', () => {
  return {
    WeatherService: jest.fn().mockImplementation(() => {
      return { getWeatherByZipAndCountryCode: mockGetWeatherByZipAndCountryCode };
    }),
  };
});

describe('Weather API', () => {
  beforeEach(() => {
    mockGetWeatherByZipAndCountryCode.mockClear();
  });

  const createEvent = (zip: string, countryCode: string): APIGatewayProxyEvent => ({
    queryStringParameters: { zip, countryCode },
    path: '',
    httpMethod: '',
    headers: {},
    multiValueHeaders: {},
    pathParameters: null,
    stageVariables: null,
    requestContext: {} as any,
    body: '',
    isBase64Encoded: false,
  });

  it('should return a 400 error if zip or countryCode are missing', async () => {
    const event = createEvent('', '');
    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ message: 'Missing zip or countryCode in the request' });
  });

  it('should return a 400 error if zip format is invalid', async () => {
    const event = createEvent('123456', 'US');
    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ message: 'Invalid zip format' });
  });

  it('should return a 400 error if countryCode format is invalid', async () => {
    const event = createEvent('12345', 'USA');
    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ message: 'Invalid countryCode format' });
  });

  it('should return weather data if the request is valid', async () => {
    const event = createEvent('12345', 'US');

    const mockWeatherData = {
      "lon": 150.8667,
      "lat": -33.7167,
      "main": "Clouds",
      "description": "overcast clouds",
      "temp": 290.27,
      "feels_like": 290.23,
      "temp_min": 288.57,
      "temp_max": 291.11,
      "pressure": 1028,
      "humidity": 84
    }

    mockGetWeatherByZipAndCountryCode.mockResolvedValue(mockWeatherData);

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(mockWeatherData);
  });

  it('should return an error if the WeatherService throws an error', async () => {
    const event = createEvent('12345', 'US');
    mockGetWeatherByZipAndCountryCode.mockRejectedValue(new Error('Some error occurred'));

    const response = await handler(event);

    expect(response.statusCode).not.toBe(200);
    expect(JSON.parse(response.body)).toEqual({ message: 'Some error occurred' });
  });
});
