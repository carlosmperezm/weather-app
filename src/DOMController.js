import { WeatherAPIController } from "./APIController"
import { DataController } from "./DataController";

export class DOMController {
  static #locationInput = document.querySelector('#locationInput')
  static #searchButton = document.querySelector('button')
  static dayData;

  static loadEvents() {
    DOMController.#searchButton.addEventListener(
      'click',
      async () => {
        try {
          const data = await WeatherAPIController
            .getCityWeather(DOMController.#locationInput.value)

          const day = DataController.getDay(0, data)
          const hour = DataController.getHour(0, 0, data)
          const week = DataController.getWeek(2, data)
          const temp = DataController.getTemperature(day)
          const feelsLike = DataController.getFeelslike(day)
          const humidity = DataController.getHumidity(day)
          const windSpeed = DataController.getWind(day)

          console.log(day)
          console.log(temp)
          console.log(feelsLike)
          console.log(humidity)
          console.log(windSpeed)
        } catch (e) {
          console.error(e)

        }
      }
    )
    return
  }

}
