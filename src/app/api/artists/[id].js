import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const artistWithUser = await prisma.artist.findUnique({
        where: { id: Number(id) },
        include: { user: true },
      });

      res.status(200).json(artistWithUser);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching artist with user data.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
