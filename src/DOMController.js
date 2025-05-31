import sunIconPath from './assets/icons/sun.png'
import cloudsIconPath from './assets/icons/cloud.png'
import cloudyIconPath from './assets/icons/cloudy.png'
import rainyIconPath from './assets/icons/rainy-day.png'
import celsiusIconPath from './assets/icons/celsius.png'
import fahrenheitIconPath from './assets/icons/fahrenheit.png'
import windIconPath from './assets/icons/wind.png'
import tempIconPath from './assets/icons/temperature.png'

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
    const baseTemp = document.createElement('span')
    const tempIcon = document.createElement('img')
    const minmaxTempContainer = document.createElement('div')
    const tempValuesContainer = document.createElement('div')
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

    baseTemp.textContent = baseTemperature
    baseTemp.classList.add('base-temperature')

    minmaxTempContainer.classList.add('minmax-temp-container')

    tempIcon.src = tempIconPath
    tempIcon.classList.add('icon')

    tempValuesContainer.classList.add('tempValues-container')

    minTemperatureElement.textContent = minTemperature
    minTemperatureElement.classList.add('minTemperature')

    maxTemperatureElement.classList.add('maxTemperature')
    maxTemperatureElement.textContent = maxTemperature

    tempValuesContainer.appendChild(maxTemperatureElement)
    tempValuesContainer.appendChild(minTemperatureElement)

    minmaxTempContainer.appendChild(tempIcon)
    minmaxTempContainer.appendChild(tempValuesContainer)

    temperatureElement.appendChild(baseTemp)
    temperatureElement.appendChild(minmaxTempContainer)

    cardContainer.appendChild(dateElement)
    cardContainer.appendChild(iconImg)
    cardContainer.appendChild(temperatureElement)

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
    const minmaxTempContainer = document.createElement('div')
    const tempIcon = document.createElement('img')
    const tempValuesContainer = document.createElement('p')
    const minTemperatureElement = document.createElement('p')
    const maxTemperatureElement = document.createElement('p')
    const windSpeedElement = document.createElement('p')
    const windSpeedIcon = document.createElement('img')
    const windDataElement = document.createElement('span')

    cardContainer.classList.add('todayInfo-container')

    nameContainer.classList.add('name-container')

    cityNameElement.textContent = cityName

    cityLocationElement.textContent = cityLocation

    temperatureElement.textContent = baseTemperature
    temperatureElement.classList.add('todayTemperature')

    moreInfoContainer.classList.add('moreInfo-container')

    descriptionElement.textContent = description

    descriptionElement.classList.add('description')

    minmaxTempContainer.classList.add('minmax-temp-container')

    tempIcon.src = tempIconPath
    tempIcon.classList.add('icon')

    tempValuesContainer.classList.add('tempValues-container')

    minTemperatureElement.textContent = minTemperature
    minTemperatureElement.classList.add('minTemperature')

    maxTemperatureElement.textContent = maxTemperature
    maxTemperatureElement.classList.add('maxTemperature')

    windSpeedIcon.src = windIconPath
    windSpeedIcon.classList.add('icon')
    windDataElement.textContent = windSpeed
    windSpeedElement.classList.add('wind-container')

    tempValuesContainer.appendChild(maxTemperatureElement)
    tempValuesContainer.appendChild(minTemperatureElement)

    minmaxTempContainer.appendChild(tempIcon)
    minmaxTempContainer.appendChild(tempValuesContainer)

    windSpeedElement.appendChild(windSpeedIcon)
    windSpeedElement.appendChild(windDataElement)

    moreInfoContainer.appendChild(descriptionElement)
    moreInfoContainer.appendChild(minmaxTempContainer)
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

    DOMController.#searchButton.addEventListener(
      'click',
      () => DOMController.displayData()
    )
    document.body.addEventListener(
      'keypress',
      (e) => {
        if (e.key === 'Enter') DOMController.displayData()
      })

  }


  static async displayData() {
    const body = document.body
    if (body.classList.contains('error-screen')) {
      document.body.classList.remove('error-screen')
      const errorText = document.querySelector('.error-msg')
      document.body.removeChild(errorText)

    }

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
    const todayCardContainer = document.querySelectorAll('.todayInfo-container')
    todayCardContainer.forEach(card => {
      card.parentElement.removeChild(card)
    })

    try {
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
          `Min: ${todayMinTemp}`,
          `Max: ${todayMaxTemp}`,
          windSpeed
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
          temp,
          `Min: ${minTemp}`,
          `Max: ${maxTemp}`,
          conditions
        )
        DOMController.addCardToWeek(card)
      })
    } catch (e) {
      console.error(e)

      DOMController.DisplayErrorScreen('Location Not Found 🦗')

    }
  }

  static DisplayErrorScreen(msg) {
    const body = document.body
    const text = document.createElement('h1')
    text.classList.add('error-msg')
    text.textContent = msg
    body.className = 'error-screen'
    body.appendChild(text)
  }

}


//TODO: Add loading when whe app is waiting for the server
//TODO: Add a message Error when the location wasn't found
