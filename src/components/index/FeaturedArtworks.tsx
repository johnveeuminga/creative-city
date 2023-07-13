import ArtworkCardGrid from "../artworks/ArtworkCardGrid";

async function getArtworks() {
  return await prisma.artwork.findMany({
    include: {
      artist: true,
    },
  });
}

export default async function FeaturedArtworks() {
  let artworks = await getArtworks();
  console.log(artworks);
  return (
    <section className="shop-index-section">
      <div className="container px-5">
        <h2 className="text-primary shop-index-section__title">
          Featured Artworks
        </h2>
        <ArtworkCardGrid artworks={artworks} />
      </div>
    </section>
  );
}
