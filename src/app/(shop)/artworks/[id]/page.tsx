import ArtworkStickyDescription from "@/components/artworks/ArtworkStickyDescription"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function Page({ 
  params: { id } 
}: { 
  params: { 
    id: string 
}}) {
  const artwork = await prisma.artwork.findFirst({
    where: {
      id: parseInt(id),
      auction_id: null,
    },
    include: {
      artist: true,
      media: true,
    }
  })

  if(!artwork)
    redirect("/")

  return (
    <div className="artwork-single py-5" style={{ minHeight: '100vh'}}>
      <div className="container">
        <div className="row position-relative">
          <div className="col-md-6">
            <div className="gallery mb-3">
              {
                artwork.media.map((media) => (
                  <picture 
                    key={media.id}
                    className="w-100 mb-3 d-block">
                    <img 
                      className="w-100"
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/${artwork?.media[0].filePath}`}
                      alt="" />
                  </picture>
                ))
              }
              {
                artwork.media.map((media) => (
                  <picture 
                    key={media.id}
                    className="w-100 mb-3 d-block">
                    <img 
                      className="w-100"
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/${artwork?.media[0].filePath}`}
                      alt="" />
                  </picture>
                ))
              }
              {
                artwork.media.map((media) => (
                  <picture 
                    key={media.id}
                    className="w-100 mb-3 d-block">
                    <img 
                      className="w-100"
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/${artwork?.media[0].filePath}`}
                      alt="" />
                  </picture>
                ))
              }
            </div>
          </div>
          <div className="col-md-6">
              <ArtworkStickyDescription artwork={artwork}/> 
          </div>
        </div>
      </div>
    </div>
  )
}