import sunIconPath from './assets/icons/sun.png'
import cloudsIconPath from './assets/icons/cloud.png'
import cloudyIconPath from './assets/icons/cloudy.png'
import rainyIconPath from './assets/icons/rainy-day.png'
import celsiusIconPath from './assets/icons/celsius.png'
import fahrenheitIconPath from './assets/icons/fahrenheit.png'

import { WeatherAPIController } from "./APIController"
import { DataController } from "./DataController";

export class DOMController {
  static #locationInput = document
    .querySelector('#locationInput')

  static #searchButton = document
    .querySelector('button')

  static dayData;

  static #degreeModeElement = document
    .querySelector('img.degree-mode')

  static toggleDegreeMode() {
    const degreeMode = DOMController.#degreeModeElement.dataset.mode
    console.log('degreeMode: ', degreeMode)
    if (degreeMode === 'celsius') {
      DOMController.#degreeModeElement.src = fahrenheitIconPath
      DOMController.#degreeModeElement.dataset.mode = 'fahrenheit'
    } else {
      DOMController.#degreeModeElement.src = celsiusIconPath
      DOMController.#degreeModeElement.dataset.mode = 'celsius'
    }
  }

  static createCard(
    date, baseTemperature, minTemperature, maxTemperature, conditions = ''
  ) {
    const cardContainer = document.createElement('div')
    const dateElement = document.createElement('p')
    const iconImg = document.createElement('img')
    const temperatureElement = document.createElement('p')
    const minTemperatureElement = document.createElement('p')
    const maxTemperatureElement = document.createElement('p')

    cardContainer.classList.add('card-container')

    dateElement.textContent = date

    if (conditions.toLowerCase().includes('rain')) {
      iconImg.src = rainyIconPath;
    } else if (conditions.toLowerCase().includes('cloudy')) {
      iconImg.src = cloudyIconPath
    } else if (conditions.toLowerCase().includes('clear')) {
      iconImg.src = sunIconPath
    } else {
      iconImg.src = cloudsIconPath
    }


    iconImg.classList.add('icon')

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
    document.querySelector('img.degree-mode')
      .src = fahrenheitIconPath

    // DOMController.#degreeModeElement.data.mode = 'fahrenheit'
    DOMController.#degreeModeElement.addEventListener(
      'click', () => {
        DOMController.toggleDegreeMode()
        DOMController.displayData()

      })

    DOMController.#searchButton
      .addEventListener('click', () => DOMController.displayData())
  }

  static async displayData() {
    try {
      const data = await WeatherAPIController
        .getCityWeather(DOMController.#locationInput.value)
      const dataController = new DataController(data)
      const degreeMode = DOMController.#degreeModeElement.dataset.mode

      console.log(data)

      //Delete the previous data
      const weekInfoContainer = document
        .querySelectorAll('.card-container')
      weekInfoContainer.forEach(card => {
        card.parentElement.removeChild(card)
      })

      // Display Todays Card
      const todayData = dataController.getDay(0)
      const todayTemp = dataController.getTemperature(todayData, degreeMode)
      const todayMinTemp = dataController.getMinTemperature(todayData, degreeMode)
      const todayMaxTemp = dataController.getMaxTemperature(todayData, degreeMode)
      const windSpeed = dataController.getWind(todayData)

      const todayCard = DOMController
        .createTodayCard(
          dataController.address,
          dataController.fullAddress,
          todayTemp,
          dataController.getDescription(todayData),
          `Min Temp: ${todayMinTemp}`,
          `Max Temp: ${todayMaxTemp}`,
          `Wind Speed: ${windSpeed}`
        )
      DOMController.displayTodayCard(todayCard)

      // Display each day of the week 
      const week = dataController.nextSevenDays
      week.forEach(dayData => {
        const datetime = dataController.getDatetime(dayData)
        const temp = dataController.getTemperature(dayData, degreeMode)
        const minTemp = dataController.getMinTemperature(dayData, degreeMode)
        const maxTemp = dataController.getMaxTemperature(dayData, degreeMode)
        const conditions = dataController.getDayConditions(dayData)

        const card = DOMController.createCard(
          datetime,
          `Temp: ${temp}`,
          `Min Temp: ${minTemp}`,
          `Max Temp: ${maxTemp}`,
          conditions
        )
        DOMController.addCardToWeek(card)
      })
    } catch (e) {
      console.error(e)

    }
  }

}


//
// TODO: Add Temperature switch option (C to F) and (F to C)
//
// TODO: Improve desing overall
