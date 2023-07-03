import { MdArrowForwardIos } from 'react-icons/md';

export default function ShopBanner() {
  return (
    <div className="shop-banner bg-secondary">
      <div className="shop-banner__yellow-bg"></div>
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
            <button className="shop-banner__icon btn btn-lg btn-tertiary">
              Explore
              <span className="ms-4 icon">
                <MdArrowForwardIos /> 
                <MdArrowForwardIos 
                  className='shop-banner__second-forward'/> 
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}