import { ArtworkWithArtistAndMedia } from "@/types/types";
import { Artwork } from "@prisma/client";
import MoneyFormat from "./MoneyFormat";
import styles from '@/styles/components/artwork-item.module.scss';
import Link from "next/link";

export default function ArtworkCard({ artwork }: { artwork: ArtworkWithArtistAndMedia }) {
  const generateGalleryImage = () => {
    return Math.floor(Math.random() * 3) + 1
  }

  const generateImageSrc = () => {
    let src = `/assets/images/gallery-${generateGalleryImage()}.png`;

    if(artwork.media && artwork.media.length)
      src = `${process.env.NEXT_PUBLIC_S3_URL}/${artwork.media[0].filePath}`

    return src;
  }

  return (
    <div className={`${styles.item} artwork-item h-100 mb-3 position-relative`}>
      <picture>
        <img 
          style={{ objectFit:'cover', objectPosition: 'center'}}
          src={generateImageSrc()} 
          alt="" 
          className="h-100 w-100" />
      </picture>
        <div className={`${styles.content} position-absolute`}>
          <div className="text-center">
            <h3 className="text-center text-white">{ artwork.name }</h3>
            <p className="text-center text-white">{ artwork.artist.name }</p>
            <p className="text-center text-white"><MoneyFormat value={ artwork.price?.toString() ?? "" }/></p>
            <Link href={`/artworks/${artwork.id}`} className="btn btn-outline-light">See More</Link>
          </div>
        </div>
    </div>
  )
}