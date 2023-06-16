import { PrismaClient } from "@prisma/client";
import ArtworkForm from "@/components/ArtworkForm";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function CreateArtwork() {
  const user = await prisma.user.findFirst();

  async function handleClick(name, description) {
    "use server";
    console.log(name, description);
    try {
      await prisma.artwork.create({
        data: {
          name,
          description,
          artist: {
            connect: { id: user.id },
          },
        },
      });
      redirect(`/artworks/${user.id}`);
      console.log("Success");

    } catch (error) {
      console.error("Error creating artwork:", error);
    }
  }

  console.log(user);
  return <ArtworkForm data={user} handleClick={handleClick} />;
}
