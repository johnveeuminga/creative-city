import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET' && id) {
    const artist = await prisma.artist.findUnique({
      where: { id: Number(id) },
    })
    res.json(artist)
  } else if (req.method === 'POST') {
    const artist = await prisma.artist.create({
      data: req.body,
    })
    res.json(artist)
  } else {
    res.send('Unsupported method')
  }
}
