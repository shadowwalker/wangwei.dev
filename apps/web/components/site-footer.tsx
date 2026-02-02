'use client'

import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Github,
  Mail,
  Sun
} from 'lucide-react'
import { useState } from 'react'

const ACCUWEATHER_URL =
  'https://www.accuweather.com/en/us/sammamish/98074/weather-forecast/2186926?city=sammamish'
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/v9iQ7tdqHqeDaboQ6'
const TIMEANDDATE_URL = 'https://www.timeanddate.com/worldclock/usa/seattle'

interface WeatherData {
  temperatureCelsius: number
  temperatureFahrenheit: number
  weatherCode: number
}

// WMO Weather interpretation codes: https://open-meteo.com/en/docs
function getWeatherIcon(code: number) {
  const iconClass = 'size-3.5'
  switch (true) {
    case code === 0:
      return <Sun className={iconClass} />
    case code <= 3:
      return <Cloud className={iconClass} />
    case code <= 48:
      return <CloudFog className={iconClass} />
    case code <= 57:
      return <CloudDrizzle className={iconClass} />
    case code <= 67:
      return <CloudRain className={iconClass} />
    case code <= 77:
      return <CloudSnow className={iconClass} />
    case code <= 82:
      return <CloudRain className={iconClass} />
    case code <= 86:
      return <CloudSnow className={iconClass} />
    case code >= 95:
      return <CloudLightning className={iconClass} />
    default:
      return <Cloud className={iconClass} />
  }
}

function getWeatherDescription(code: number): string {
  switch (true) {
    case code === 0:
      return 'Clear'
    case code <= 3:
      return 'Partly Cloudy'
    case code <= 48:
      return 'Foggy'
    case code <= 57:
      return 'Drizzle'
    case code <= 67:
      return 'Rain'
    case code <= 77:
      return 'Snow'
    case code <= 82:
      return 'Showers'
    case code <= 86:
      return 'Snow Showers'
    case code >= 95:
      return 'Thunderstorm'
    default:
      return 'Cloudy'
  }
}

function WeatherDisplay({ weather }: { weather: WeatherData }) {
  const [showFahrenheit, setShowFahrenheit] = useState(false)

  return (
    <a
      className='inline-flex items-center gap-1.5 transition-colors hover:text-foreground'
      href={ACCUWEATHER_URL}
      onMouseEnter={() => setShowFahrenheit(true)}
      onMouseLeave={() => setShowFahrenheit(false)}
      rel='noopener noreferrer'
      target='_blank'
    >
      {getWeatherIcon(weather.weatherCode)}
      <span>{getWeatherDescription(weather.weatherCode)}</span>
      <span>
        {showFahrenheit
          ? `${weather.temperatureFahrenheit}°F`
          : `${weather.temperatureCelsius}°C`}
      </span>
    </a>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden='true'
      className={className}
      fill='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  )
}

function TimezoneDisplay({ isDST }: { isDST: boolean }) {
  const [showUTC, setShowUTC] = useState(false)
  const timezone = isDST ? 'PDT' : 'PST'
  const utcOffset = isDST ? 'UTC-7' : 'UTC-8'

  return (
    <a
      className='transition-colors hover:text-foreground'
      href={TIMEANDDATE_URL}
      onMouseEnter={() => setShowUTC(true)}
      onMouseLeave={() => setShowUTC(false)}
      rel='noopener noreferrer'
      target='_blank'
    >
      {showUTC ? utcOffset : timezone}
    </a>
  )
}

interface SiteFooterProps {
  isDST: boolean
  locale: string
  weather: WeatherData | null
}

export default function SiteFooter({
  isDST,
  locale,
  weather
}: SiteFooterProps) {
  const xUrl =
    locale === 'zh'
      ? 'https://x.com/wangwei_dev'
      : 'https://x.com/en_wangwei_dev'

  return (
    <footer className='mx-auto max-w-4xl px-6 py-16 md:px-12'>
      <div className='mb-12 w-3/5 border-foreground/20 border-t' />
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='flex flex-wrap items-center gap-x-2 text-muted-foreground/50 text-xs'>
          <a
            className='transition-colors hover:text-foreground'
            href={GOOGLE_MAPS_URL}
            rel='noopener noreferrer'
            target='_blank'
          >
            Sammamish, WA
          </a>
          <span className='text-muted-foreground/30'>·</span>
          <TimezoneDisplay isDST={isDST} />
          {weather && (
            <>
              <span className='text-muted-foreground/30'>·</span>
              <WeatherDisplay weather={weather} />
            </>
          )}
        </div>
        <nav className='flex items-center gap-6 md:justify-end'>
          <a
            aria-label='X (Twitter)'
            className='text-muted-foreground/50 transition-colors hover:text-foreground'
            href={xUrl}
            rel='noopener noreferrer'
            target='_blank'
          >
            <XIcon className='size-4' />
          </a>
          <a
            aria-label='GitHub'
            className='text-muted-foreground/50 transition-colors hover:text-foreground'
            href='https://github.com/shadowwalker'
            rel='noopener noreferrer'
            target='_blank'
          >
            <Github className='size-4' />
          </a>
          <a
            aria-label='Email'
            className='text-muted-foreground/50 transition-colors hover:text-foreground'
            href='mailto:hi@wangwei.dev'
          >
            <Mail className='size-4' />
          </a>
        </nav>
      </div>
    </footer>
  )
}
