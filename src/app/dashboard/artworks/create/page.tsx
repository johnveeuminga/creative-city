import { PrismaClient } from "@prisma/client";
import ArtworkForm from "@/components/ArtworkForm";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function CreateArtwork() {
  const user = await await prisma.user.findUnique({
    where: {
      id: 2,
    },
  });

  console.log(user);
  return <ArtworkForm data={user} />;
}