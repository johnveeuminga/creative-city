import styles from "./ArtistProfile.module.css";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function ArtistProfile({
  params: { id: artistId },
}: {
  params: {
    id: string;
  };
}) {
  const artist = await prisma.artist.findFirst({
    where: {
      id: parseInt(artistId),
    },
    include: {
      user: {
        include: {
          artworks: true, // Include artworks related to this user
        },
        
      },
    },
  });

  const artworkCount = await prisma.artwork.count({
    where: {
      artist_id: artist?.user.id,
    },
  });

  return (
    <div className={styles.container}>
      <div>
        <div className="col col-md-9 col-lg-7 col-xl-5">
          <div className="card" style={{ borderRadius: "15px" }}>
            <div className="card-body p-4">
              <div className="d-flex text-black">
                <div className="flex-shrink-0">
                  <img
                    src={artist?.avatar_path ?? ""}
                    alt="Generic placeholder image"
                    className="img-fluid"
                    style={{ width: "180px", borderRadius: "10px" }}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-1">
                    {artist?.user.name}
                  </h5>
                  <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                    Artist
                  </p>
                  <div
                    className="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: "#efefef" }}
                  >
                    <div>
                      <p className="small text-muted mb-1">Artworks</p>
                      <p className="mb-0">{ artworkCount }</p>
                    </div>
                    <div className="px-3">
                      <p className="small text-muted mb-1">Followers</p>
                      <p className="mb-0">976</p>
                    </div>
                    <div>
                      <p className="small text-muted mb-1">Articles</p>
                      <p className="mb-0">41</p>
                    </div>
                  </div>
                  <div className="d-flex pt-1">
                    <button
                      type="button"
                      className="btn btn-outline-primary me-1 flex-grow-1"
                    >
                      Chat
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary flex-grow-1"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.artistDetails}>
          <h5>My Story</h5>
          <p>{artist?.myStory}</p>
          <h5>My Bio</h5>
          <p>{artist?.myBio}</p>
        </div>

        <div className={styles.tabContainer}>
          <div className={`${styles.tab} ${styles.active}`}>Artworks</div>
          <div className={styles.tab}>Auction Results</div>
          <div className={styles.tab}>About</div>
          {/* ... other tabs ... */}
        </div>

        <div className={styles.artworksContainer}>
          {artist?.user.artworks.map((artwork) => (
            <div className={`${styles.artwork}`} key={artwork.id}>
              <div className={styles.artworkImage}>
                <Image
                  src={artwork.image || "https://via.placeholder.com/150"}
                  alt={artwork.name} // I assume the artwork's title is in the `name` field
                  layout="responsive"
                  width={200}
                  height={200}
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className={styles.artworkInfo}>
                <h3 className={styles.artworkTitle}>
                  <Link href="/listing-details-1">{artwork.name}</Link>{" "}
                  {/* Adjusted to `name` */}
                </h3>
                <p className={styles.artworkYear}>Unknown Year</p>{" "}
                {/* I don't see a `year` field in your `Artwork` model */}
                <p className={styles.artworkPrice}>{artwork.price}</p>{" "}
                {/* Adjusted to `price` */}
              </div>
            </div>
          ))}
        </div>


      </div>
      {/* 
      <div className={styles.sidebar}>
        <div className={styles.filterSection}>
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
      </div> */}
    </div>
  );
}
