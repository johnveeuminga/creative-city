'use client'

import SlickSlider from '@/components/SlickSlider';
import styles from '@/styles/live-auction-card.module.scss';
import { Auction } from "@prisma/client"
import { DateTime } from "luxon";
import Link from "next/link";
import Image from 'next/image';
import { MdSell, MdOutlineTimer, MdArrowRight, MdArrowRightAlt, MdOutlineArrowRightAlt } from "react-icons/md";
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { AuctionWithArtworkCount } from '@/lib/server/auctions';
import { useEffect, useState } from 'react';

export default function LiveAuctionCard({
  auction
}: {
  auction: AuctionWithArtworkCount,
}) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const DateDetails = ({ startDate, endDate }: { startDate: Date, endDate: Date }) => {
    const now = DateTime.now()
    const date = DateTime.fromJSDate(startDate)
    const hasStarted = now >= date;

    return (
      <>
        {
          hasStarted && 
            <p>Ends at <span className='fw-semibold'>{DateTime.fromJSDate(endDate).toFormat("MMM dd, yyyy hh:mm a")}</span></p>
        }
      </>
    )
  }

  const Timer = ({ endDate }: { endDate: Date }) => {
    const renderer =  ({ formatted: { days, hours, minutes, seconds } }: CountdownRenderProps) => {
      const Display = ({ text, label }: { text: string, label: string}) => (
        <div className="text-center">
          <p className='mb-0 fs-5 fw-semibold lh-sm'>{ text }</p>
          <p className='mb-0 lh-sm'><small>{ label }</small></p>
        </div>
      )

      const Divider = () => (
        <div className="text-center mx-2">
          <p className='mb-0 fs-5 fw-semi-bold'>:</p> 
        </div>
      )

      return (
        <div className="d-flex text-white align-items-start">
          {
            parseInt(days) > 0 &&
            <>
              <Display text={days} label='D'/>
              <Divider /> 
            </>
          }
          <Display text={hours} label='H'/>
          <Divider /> 
          <Display text={minutes} label='M'/>
          <Divider /> 
          <Display text={seconds} label='S'/>
        </div>
      )
    }

    return (
      <Countdown zeroPadTime={2} date={endDate} renderer={renderer}/>
    )
  }

  return (
    <div className="live-auction-card card overflow-hidden">
      <div className={`${styles.gallery} position-relative`}>
        <SlickSlider className={styles.slider}>
          <div className={styles.slide}>
            <Image
              fill={true}
              style={{
                objectFit: 'cover',
              }}
              alt="Slider 1"
              src="/assets/images/sample-image.png"/>
          </div>
        </SlickSlider>
        <div className={`${styles.timer} timer position-absolute mx-auto d-flex align-items-center justify-content-center`}>
          <div 
            className={`rounded-pill opacity-50 top-0 start-0 timer-background position-absolute w-100 h-100 bg-tertiary z-n1`}>
          </div>
          <div className="position-absolute top-0 start-0 ms-4 h-100 d-flex align-items-center">
            <p className='mb-0 text-white fs-4'><MdOutlineTimer /></p>
          </div>
          {
            hydrated && 
              <div className='text-center'>
                <Timer endDate={auction.end_date}/>
              </div>
          }
        </div>
      </div>
      <div className="card-body bg-primary text-white">
        <p className="fw-semibold fs-3">{ auction.name }</p>
        <DateDetails 
          startDate={ auction.start_date }
          endDate={auction.end_date}/> 
        <p><span className='fw-semibold'>{ auction._count.artworks }</span> Artworks</p>
        <div className="live-auction-card__buttons">
          <Link 
            href={`/auctions/${auction.id}`}
            prefetch={false}
            className="btn btn-outline-tertiary d-inline-flex align-items-center text-white border-2">
              See More
              <MdOutlineArrowRightAlt className='ms-3' />
          </Link>
        </div>
      </div>
    </div>
  )
}