
export class DataController {
  #data;

  constructor(data) {
    this.#data = data
  }

  get address() {
    return this.#data.address
  }

  get fullAddress() {
    return this.#data.resolvedAddress
  }

  getDescription(data = this.#data) {
    return data.description
  }

  getDayConditions(dayData) {
    return dayData.conditions
  }

  getDay(dayNumber) {
    // The day number starts from zero
    if (dayNumber < 0 || dayNumber > 14) {
      return { msg: 'Only the days within two weeks are available' }
    }
    const dayData = this.#data.days[dayNumber]
    return dayData
  }

  getDatetime(dayData) {
    return dayData.datetime
  }

  getHour(hourNumber, dayNumber) {
    // Hour number must start from 0-23
    if (hourNumber < 0 || hourNumber > 23) {
      return { msg: 'Must be an hour number between 0 and 24' }
    }
    const dayData = getDay(dayNumber)
    const hourData = dayData.hours[hourNumber]
    return hourData
  }

  get nextSevenDays() {
    const days = []
    // const days = this.#data.days.slice(1,8)
    for (let i = 1; i <= 7; i++) {
      const day = this.getDay(i)
      days.push(day)
    }
    return days
  }

  getMinTemperature(dayData, degreeMode = 'fahrenheit') {
    let tempMin = dayData.tempmin
    if (degreeMode === 'celsius') {
      tempMin = this.toCelsius(tempMin)
    }
    return tempMin
  }
  getMaxTemperature(dayData, degreeMode = 'fahrenheit') {
    let tempMax = dayData.tempmax
    if (degreeMode === 'celsius') {
      tempMax = this.toCelsius(tempMax)
    }
    return tempMax
  }
  getTemperature(dayData, degreeMode = 'fahrenheit') {
    let temp = dayData.temp
    if (degreeMode === 'celsius') {
      temp = this.toCelsius(temp)
    }
    return temp
  }

  getWind(dayData) {
    const windSpeed = dayData.windspeed
    return windSpeed
  }

  toCelsius(fahrenheitTemperature) {
    const celsiusTemperature = (fahrenheitTemperature - 32) * 5 / 9
    return celsiusTemperature.toFixed(1)
  }
  toFahrenheit(celsiusTemperature) {
    const fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32
    return fahrenheitTemperature.toFixed(1)
  }

}
