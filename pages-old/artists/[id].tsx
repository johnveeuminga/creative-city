import { useRouter } from 'next/router'
import prisma from '../../src/lib/prisma'
import styles from './ArtistProfile.module.css'

export default function ArtistProfile({ artist }: { artist: any }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Placeholder for artworks
  const artworks = [
    { id: 1, title: 'Artwork 1', year: 2020, price: 'Price on request', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Artwork 2', year: 2021, price: 'Price on request', image: 'https://via.placeholder.com/150' },
    // ... other artworks ...
  ];

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <img src="https://via.placeholder.com/200" alt="Artist" className={styles.artistPhoto} />
          <div>
            <h1 className={styles.title}>{artist.nickname}</h1>
            <p>American, b. 1960</p> {/* Replace with actual data */}
            <p>605 Followers</p> {/* Replace with actual data */}
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
              <img src={artwork.image} alt={artwork.title} />
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

// export async function getServerSideProps({ params }) {
//   const artist = await prisma.artist.findUnique({
//     where: {
//       id: Number(params.id),
//     },
//     select: {
//       id: true,
//       nickname: true,
//       myStory: true,
//       myBio: true
//     },
//   });

//   return {
//     props: { artist },
//   };
// }
