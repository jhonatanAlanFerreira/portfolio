export interface WeatherAPIResponse {
  timelines: {
    hourly: {
      time: string;
      values: {
        temperature: number;
        humidity: number;
        temperatureApparent: number;
        weatherCode: number;
        windSpeed: number;
      };
    }[];
    daily: {
      time: string;
      values: {
        temperatureMax: number;
        temperatureMin: number;
        weatherCodeMax: number;
        weatherCodeMin: number;
      };
    }[];
  };
}
