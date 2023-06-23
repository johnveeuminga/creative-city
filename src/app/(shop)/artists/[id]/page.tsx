import styles from './ArtistProfile.module.css';
import { Artist, User } from '@prisma/client';
import Link from 'next/link';
import prisma from "@/lib/prisma"
import Image from "next/image"
import { redirect } from "next/navigation"
import { relative } from "path"

export default async function ArtistProfile({ 
    params: {
        id: artistId
    }
}: {
    params: {
      id: string
    }
  }) 
{
    const artist = await prisma.artist.findFirst({
        where: {
          id: parseInt(artistId)
        },
        include: {
          user: true,
        }
      })




    // Placeholder for artworks
    // const artworks = artist.artworks || []
    const artworks = [
        { id: 1, title: 'Artwork 1', year: 2020, price: 'Price on request', image: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Artwork 2', year: 2021, price: 'Price on request', image: 'https://via.placeholder.com/150' },
        // ... other artworks ...
      ];

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <Image
            src={'https://via.placeholder.com/200'}
            // src={artist.image || 'https://via.placeholder.com/200'}
            alt={'test'}
            className={styles.artistPhoto}
            width={200}
            height={200}
          />
          <div>
            <h1 className={styles.title}>{artist?.user.first_name} {artist?.user.last_name}</h1>

            {/* <p>{artist.nationality}, b. {artist.birthYear}</p>
            <p>{artist.followers} Followers</p> */}

            <p>{'Filipino'}, B. {'1997'}</p>
            <p>{69} Followers</p>

            <button className={styles.follow}>Follow</button>
          </div>
        </div>

        {/* Artist's story and bio */}
        <div className={styles.artistDetails}>
          <h2>My Story</h2>
          <p>{artist.myStory}</p>
          <h2>My Bio</h2>
          <p>{artist.myBio}</p>
        </div>

        <div className={styles.tabContainer}>
          <div className={`${styles.tab} ${styles.active}`}>Artworks</div>
          <div className={styles.tab}>Auction Results</div>
          <div className={styles.tab}>About</div>
          {/* ... other tabs ... */}
        </div>

        {/* Replace this section depending on the active tab */}
        <div>
          {artworks.map(artwork => (
            <div className={styles.artwork} key={artwork.id}>
              <Image
                src={artwork.image || 'https://via.placeholder.com/150'}
                alt={artwork.title}
                width={150}
                height={150}
              />
              <div className={styles.artworkInfo}>
                <p className={styles.artworkTitle}>{artwork.title}</p>
                <p className={styles.artworkYear}>{artwork.year}</p>
                <p className={styles.artworkPrice}>{artwork.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.filterSection}>
          {/* Filter options */}
          <h2>Filter by</h2>
          <p>Keyword Search</p>
          <p>Rarity</p>
          <p>Medium</p>
          <p>Price</p>
          <p>Size</p>
          <p>Ways to Buy</p>
          <p>Material</p>
          <p>Artwork Location</p>
          <p>Time Period</p>
          <p>Color</p>
        </div>
      </div>
    </div>
  )
}