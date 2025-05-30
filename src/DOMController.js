import iconPath from './assets/icons/sun.png'

import { WeatherAPIController } from "./APIController"
import { DataController } from "./DataController";

export class DOMController {
  static #locationInput = document.querySelector('#locationInput')
  static #searchButton = document.querySelector('button')
  static dayData;

  static createCard(
    date, baseTemperature, minTemperature, maxTemperature
  ) {
    const cardContainer = document.createElement('div')
    const dateElement = document.createElement('p')
    const iconImg = document.createElement('img')
    const temperatureElement = document.createElement('p')
    const minTemperatureElement = document.createElement('p')
    const maxTemperatureElement = document.createElement('p')

    cardContainer.classList.add('card-container')

    dateElement.textContent = date

    iconImg.classList.add('icon')
    iconImg.src = iconPath

    temperatureElement.textContent = baseTemperature

    minTemperatureElement.textContent = minTemperature

    maxTemperatureElement.textContent = maxTemperature

    cardContainer.appendChild(dateElement)
    cardContainer.appendChild(iconImg)
    cardContainer.appendChild(temperatureElement)
    cardContainer.appendChild(minTemperatureElement)
    cardContainer.appendChild(maxTemperatureElement)

    return cardContainer;
  }

  static addCardToWeek(cardElement) {
    const weekInfoContainer = document
      .querySelector('.weekInfo-container')
    weekInfoContainer.appendChild(cardElement)
  }

  static displayTodayCard(todayCard) {
    const main = document.querySelector('main')
    main.appendChild(todayCard)
  }

  static createTodayCard(
    cityName,
    cityLocation,
    baseTemperature,
    description,
    minTemperature,
    maxTemperature,
    windSpeed
  ) {
    const cardContainer = document.createElement('div')
    const nameContainer = document.createElement('div')
    const cityNameElement = document.createElement('h1')
    const cityLocationElement = document.createElement('p')
    const temperatureElement = document.createElement('p')
    const moreInfoContainer = document.createElement('div')
    const descriptionElement = document.createElement('p')
    const minTemperatureElement = document.createElement('p')
    const maxTemperatureElement = document.createElement('p')
    const windSpeedElement = document.createElement('p')

    cardContainer.classList.add('todayInfo-container')

    nameContainer.classList.add('name-container')

    cityNameElement.textContent = cityName

    cityLocationElement.textContent = cityLocation

    temperatureElement.textContent = baseTemperature
    temperatureElement.classList.add('todayTemperature')

    moreInfoContainer.classList.add('moreInfo-container')

    descriptionElement.textContent = description

    minTemperatureElement.textContent = minTemperature
    minTemperatureElement.classList.add('minTemperature')

    maxTemperatureElement.textContent = maxTemperature
    maxTemperatureElement.classList.add('maxTemperature')

    windSpeedElement.textContent = windSpeed


    moreInfoContainer.appendChild(descriptionElement)
    moreInfoContainer.appendChild(minTemperatureElement)
    moreInfoContainer.appendChild(maxTemperatureElement)
    moreInfoContainer.appendChild(windSpeedElement)

    nameContainer.appendChild(cityNameElement)
    nameContainer.appendChild(cityLocationElement)

    cardContainer.appendChild(nameContainer)
    cardContainer.appendChild(temperatureElement)
    cardContainer.appendChild(moreInfoContainer)

    return cardContainer;
  }

  static loadEvents() {
    DOMController.#searchButton.addEventListener(
      'click',
      async () => {
        try {
          const data = await WeatherAPIController
            .getCityWeather(DOMController.#locationInput.value)

          console.log(data)

          // Display Todays Card
          const todayData = DataController.getDay(0, data)
          const todayCard = DOMController
            .createTodayCard(
              data.address,
              data.resolvedAddress,
              `Temp: ${todayData.temp}`,
              todayData.description,
              `Min Temp: ${todayData.tempmin}`,
              `Max Temp: ${todayData.tempmax}`,
              `Wind Speed: ${todayData.windspeed}`
            )
          DOMController.displayTodayCard(todayCard)

          // Display each day of the week 
          const week = DataController.getNextSevenDays(data)
          week.forEach(day => {
            const card = DOMController.createCard(
              day.datetime,
              `Temp: ${day.temp}`,
              `Min Temp: ${day.tempmin}`,
              `Max Temp: ${day.tempmax} `
            )
            DOMController.addCardToWeek(card)
          })


        } catch (e) {
          console.error(e)

        }
      }
    )
    return
  }

}
