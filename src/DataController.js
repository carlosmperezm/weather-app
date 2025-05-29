
export class DataController {

  static getDay(dayNumber, data) {
    // The day number starts from zero
    if (dayNumber < 0 || dayNumber > 14) {
      return { msg: 'Only the days within two weeks are available' }
    }
    const dayData = data.days[dayNumber]
    return dayData
  }

  static getHour(hourNumber, dayNumber, data) {
    // Hour number must start from 0-23
    if (hourNumber < 0 || hourNumber > 23) {
      return { msg: 'Must be an hour number between 0 and 24' }
    }
    const dayData = DataController.getDay(dayNumber, data)
    const hourData = dayData.hours[hourNumber]
    return hourData
  }

  static getWeek(weekNumber, data) {
    // Only two weeks are allowed 
    // so the values for weekNumber can only be 1 or 2
    let weekData;
    if (weekNumber < 1 || weekNumber > 2) {
      return { msg: 'Only values of 1 and 2 are allowed' }
    }
    if (weekNumber === 1) {
      weekData = data.days.slice(0, 7);
    } else if (weekNumber === 2) {
      weekData = data.days.slice(8);
    }
    return weekData
  }

  static getTemperature(dayData) {
    const temp = dayData.temp
    const tempMin = dayData.tempmin
    const tempMax = dayData.tempmax
    return { temp, tempMin, tempMax }
  }

  static getFeelslike(dayData) {
    const feelsLike = dayData.feelslike
    const feelsLikeMin = dayData.feelslikemin
    const feelsLikeMax = dayData.feelslikemax
    return { feelsLike, feelsLikeMin, feelsLikeMax }
  }

  static getHumidity(dayData) {
    const humidity = dayData.humidity
    return humidity
  }

  static getWind(dayData) {
    const windSpeed = dayData.windspeed
    return windSpeed
  }

  static toCelsius(fahrenheitTemperature) {
    const celsiusTemperature = (fahrenheitTemperature - 32) * 5 / 9
    return celsiusTemperature.toFixed(2)
  }
  static toFahrenheit(celsiusTemperature) {
    const fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32
    return fahrenheitTemperature.toFixed(2)
  }

}
