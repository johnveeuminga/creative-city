import { PrismaClient } from "@prisma/client";
import ArtworkForm from "@/components/ArtworkForm";
import { redirect } from "next/navigation";
import { PageToolbar } from "@/components/layout/dashboard/PageToolbar";

const prisma = new PrismaClient();

export default async function CreateArtwork() {
  const user = await await prisma.user.findUnique({
    where: {
      id: 2,
    },
  });

  console.log(user);
  return (
    <>
      <PageToolbar
          heading="Create Artwork"
          breadcrumbs={[
            {
              label: "Dashboard",
            }, 
            {
              label: "Artwork",
            },
            {
              label: "Create",
              active: true
            }
          ]}
         />
      <ArtworkForm data={user} />
    </>
  );
}
