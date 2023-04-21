# Weather API Solution

## Running the app
Although I've used the provided boilerplate, I've still opted to use Serverless Framework to for this exam. The instructions
below will help run the app locally

### Prerequisites
1. Install NodeJS (v16.13.2 or newer) and npm (or yarn)
2. Install the Serverless framework globally

### Local development
1. Install the project dependencies by running `npm install` (or `yarn install`) in the project directory.
2. Start the local development server with `sls offline`. This will run the API locally using the `serverless-offline` plugin.

### Environment Variables
Please update `OPEN_WEATHER_API_KEY` with your person OpenWeather API KEY

## Structure (Design Choices)
I've decided to use the boilerplate already as it's structured already in a modular
way to ensure separation of concerns and promote maintainability. The main components of the project are the following:
- `handlers`: Contains the AWS Lambda function handlers.
- `services`: Contains the business logic and external service interactions
- `utils`: Contains utility functions and classes used throughout the project

I've also added a basic set of test to ensure certain business rules are working.

If given more time, the following improvements could be made to the solution:
1. **Caching**: Implement a more robust logging system to facilitate easier debugging and monitoring.
2. **(Additional) Logging**: Implement caching to store recent weather data to reduce the number of API calls to OpenWeatherMap and improve response times.
3. **Error Reporting**: Integrate with an error reporting service lto capture and report errors in real-time.
4. **Rate Limiting**: Implement rate limiting for the API to prevent abuse and protect the OpenWeatherMap API from excessive requests.
5. **Environment Configuration**: Improve environment configuration management to better support multiple environments.