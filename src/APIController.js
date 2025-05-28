
import KEY from '../API_KEY';

const API_KEY = KEY

export class WeatherAPIController {
  static #BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

  static async getCityWeather(location) {
    const url = `${WeatherAPIController.#BASE_URL}${location}?key=${API_KEY}`
    const errorMsg = 'Location not found'
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) return { errorMsg: errorMsg }
    return response.json()
  }
}
