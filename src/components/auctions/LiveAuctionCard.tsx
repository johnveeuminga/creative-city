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
            <p className='fw-semibold mb-1'>Ends at <span className='fw-semibold'>{DateTime.fromJSDate(endDate).toFormat("MMM dd, yyyy hh:mm a")}</span></p>
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
    <Link 
      href={`/auctions/${auction.id}`}
      className='text-decoration-none'>
      <div className="live-auction-card card shadow-sm overflow-hidden">
        <div className={`${styles.gallery} position-relative`}>
          <div className={`${styles['gallery-images']}`}>
            {
              auction.artworks.map((auctionArtwork, index) => (
                <div
                    key={auctionArtwork.artwork_id}
                    className={`gallery-image ${index == 2 ? styles['gallery-images__third']: 'gallery-image--' + index}`}>
                      <Image 
                        fill={true}
                        style={{ objectPosition: "center", objectFit: "cover"}}
                        src={auctionArtwork.artwork.media.length ? `${process.env.NEXT_PUBLIC_S3_URL}/${auctionArtwork.artwork.media[0].filePath}`:  "/assets/images/features/features-1.jpg" }
                        alt='Gallery 1'
                      /> 
                </div>
              ))
            }
            {/* <div className="one">
              <Image 
                fill={true}
                style={{ objectPosition: "center", objectFit: "cover"}}
                src={"/assets/images/gallery-1.png"}
                alt='Gallery 1'
                />
            </div>
            <div className="two">
                <Image 
                  fill={true}
                  style={{ objectPosition: "center", objectFit: "cover"}}
                  src={"/assets/images/gallery-2.png"}
                  alt='Gallery 1' />
            </div>
            <div className={`${styles['gallery-images__third']}`}>
                <Image 
                  fill={true}
                  style={{ objectPosition: "center", objectFit: "cover"}}
                  src={"/assets/images/gallery-3.png"}
                  alt='Gallery 1' />
            </div> */}
          </div> 
          
          <div className={`${styles.timer} timer position-absolute mx-auto d-flex align-items-center justify-content-center`}>
            <div 
              className={`rounded-pill opacity-50 top-0 start-0 timer-background position-absolute w-100 h-100 bg-primary z-n1`}>
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
        <div className="card-body">
          <h4 className="fs-4 fw-bold text-center mb-4">{ auction.name }</h4>
          <DateDetails 
            startDate={ auction.start_date }
            endDate={auction.end_date}/> 
          <p><span className='fw-semibold'>{ auction._count.artworks }</span> Artworks</p>
          <div className="live-auction-card__buttons">
          </div>
        </div>
      </div>
    </Link>
  )
}