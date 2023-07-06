'use client'

import { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'

export function AuctionDetailsCountdown({ date }: { date: Date }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true)
  }, []);

  const renderer = ({ formatted: { days, hours, minutes, seconds } }: CountdownRenderProps) => (
    <div suppressHydrationWarning={true} className="timer d-flex justify-content-around mb-4">
      <div className="timer-section days">
        <p className="value fw-semibold mb-0">{ days }</p>
        <p className="label"><small>Days</small></p>
      </div>
      <div className="timer-section mx-2">
        <p className="value fw-semibold mb-0">:</p>
      </div>
      <div className="timer-section hours">
        <p className="value fw-semibold mb-0">{ hours }</p>
        <p className="label"><small>Hrs</small></p>
      </div>
      <div className="timer-section mx-2">
        <p className="value fw-semibold mb-0">:</p>
      </div>
      <div className="timer-section minutes">
        <p className="value fw-semibold mb-0">{ minutes }</p>
        <p className="label"><small>Mins</small></p>
      </div>
      <div className="timer-section mx-2">
        <p className="value mb-0">:</p>
      </div>
      <div className="timer-section seconds">
        <p className="value fw-semibold mb-0">{ seconds }</p>
        <p>Sec</p>
      </div>
    </div> 
  )
  return (
    <>
      {
        hydrated &&
          <Countdown date={date} zeroPadTime={2} renderer={renderer}/>
      }
    </>
  )
}