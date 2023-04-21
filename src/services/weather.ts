import { HttpClient, HttpException } from '../utils';
import { OpenWeatherMapResponse } from '../@types'

const apiKey = process.env.OPEN_WEATHER_API_KEY;

export class WeatherService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('https://api.openweathermap.org/data/2.5');
  }

  async getWeatherByZipAndCountryCode(zip: string, countryCode: string) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const httpResponse = await this.httpClient.get<OpenWeatherMapResponse>(`/weather?zip=${zip},${countryCode}&appid=${apiKey}`, options);
      const response = httpResponse.data;

      return {
        lon: response.coord.lon,
        lat: response.coord.lat,
        main: response.weather[0].main,
        description: response.weather[0].description,
        temp: response.main.temp,
        feels_like: response.main.feels_like,
        temp_min: response.main.temp_min,
        temp_max: response.main.temp_max,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

