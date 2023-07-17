import { PrismaClient } from "@prisma/client";
import ArtworkForm from "@/components/ArtworkForm";
import { redirect } from "next/navigation";
import { PageToolbar } from "@/components/layout/dashboard/PageToolbar";

const prisma = new PrismaClient();

export default async function CreateArtwork() {
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
      <ArtworkForm />
    </>
  );
}
