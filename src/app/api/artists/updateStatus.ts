import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { artistId, status } = req.body;
  
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const updatedArtist = await prisma.artist.update({
      where: { id: Number(artistId) },
      data: { status },
    });

    return res.json(updatedArtist);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while updating the artist status" });
  }
};