import { WeatherAPIController } from "./APIController"

export class DOMController {
  static #locationInput = document.querySelector('#locationInput')
  static #searchButton = document.querySelector('button')

  static loadEvents() {
    DOMController.#searchButton.addEventListener(
      'click',
      () => {
        WeatherAPIController.getCityWeather(DOMController.#locationInput.value)
          .then(console.log)
          .catch(console.error)
      }
    )
    return
  }

}
