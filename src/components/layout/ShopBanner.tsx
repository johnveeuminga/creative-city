import { MdArrowForwardIos } from 'react-icons/md';
import styles from '@/styles/components/banner.module.scss'

export default function ShopBanner() {
  return (
    <div className="shop-banner d-flex align-items-center position-relative">
      {/* <div className={`${styles.pattern} w-100`}></div> */}
      <div className="container">
        <div className="content w-50 mt-5">
          <h1 className={`mb-3 fw-bold`}>A City of creators, a Marketplace of Wonder.</h1>
          <h4>Discover Exceptional Artists and One-of-a-Kind Creations.</h4>
        </div>
      </div>
      <div 
        style={{ position: 'absolute', right: '0', top: '110px', width: '45%', height: '100%'}}
        className="bg-image">
        <picture className='h-100'>
          <img 
            className='w-100 h-100'
            style={{ objectFit: 'cover', objectPosition: 'top left' }}
            src="/assets/images/banner-transparent.png" 
            alt="" />
        </picture>
      </div>
      {/* <div className="shop-banner__yellow-bg"></div>
      <div className="shop-banner__top-line"></div>
      <div className="container h-100  position-relative z-3">
        <div className="shop-banner__content">
          <div className="shop-banner__heading">
            <h1>
              Discover and Collect Artworks you love.
            </h1>
            <h2>
            Digital marketplace for artwork collectibles. Buy, sell and discover exclusive assets.
            </h2>
            <button className="shop-banner__icon btn btn-lg btn-outline-primary">
              Explore
              <span className="ms-4 icon">
                <MdArrowForwardIos /> 
                <MdArrowForwardIos 
                  className='shop-banner__second-forward'/> 
              </span>
            </button>
          </div>
        </div>
      </div> */}
    </div>
  )
}