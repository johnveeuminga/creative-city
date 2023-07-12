import { ArtworkWithArtist } from "@/types/types";
import { Artwork } from "@prisma/client";
import MoneyFormat from "./MoneyFormat";
import styles from '@/styles/components/artwork-item.module.scss';

export default function ArtworkCard({ artwork }: { artwork: ArtworkWithArtist }) {
  const generateGalleryImage = () => {
    return Math.floor(Math.random() * 3) + 1
  }
  return (
    <div className={`${styles.item} artwork-item h-100 mb-3 position-relative`}>
      <img 
        src={`/assets/images/gallery-${generateGalleryImage()}.png`} 
        alt="" 
        className="h-100 w-100" />
        <div className={`${styles.content} position-absolute`}>
          <div className="text-center">
            <h3 className="text-center text-white">{ artwork.name }</h3>
            <p className="text-center text-white">{ artwork.artist.first_name } { artwork.artist.last_name }</p>
            <button className="btn btn-outline-light">See More</button>
          </div>
        </div>
    </div>
  )
}