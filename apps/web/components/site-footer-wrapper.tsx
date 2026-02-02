import { getLocale } from 'next-intl/server'
import SiteFooter from './site-footer'

const SAMMAMISH_LAT = 47.6163
const SAMMAMISH_LON = -122.0356

interface WeatherResponse {
  current: {
    temperature_2m: number
    weather_code: number
  }
}

function isPacificDST(): boolean {
  const now = new Date()
  const pacificTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
  )
  const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }))
  const offsetHours = (utcTime.getTime() - pacificTime.getTime()) / 3_600_000
  return offsetHours === 7
}

function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32)
}

async function fetchWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${SAMMAMISH_LAT}&longitude=${SAMMAMISH_LON}&current=temperature_2m,weather_code&timezone=America/Los_Angeles`

    const res = await fetch(url, {
      next: { revalidate: 1800 }
    })

    if (!res.ok) {
      return null
    }

    const data: WeatherResponse = await res.json()
    const celsius = Math.round(data.current.temperature_2m)

    return {
      temperatureCelsius: celsius,
      temperatureFahrenheit: celsiusToFahrenheit(celsius),
      weatherCode: data.current.weather_code
    }
  } catch {
    return null
  }
}

export default async function SiteFooterWrapper() {
  const [locale, weather] = await Promise.all([getLocale(), fetchWeather()])
  const isDST = isPacificDST()

  return <SiteFooter isDST={isDST} locale={locale} weather={weather} />
}
