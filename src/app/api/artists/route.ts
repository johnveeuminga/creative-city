import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  
//   const { id } = req.query

//   if (req.method === 'GET' && id) {
//     const artist = await prisma.artist.findUnique({
//       where: { id: Number(id) },
//     })
//     res.json(artist)
//   } else if (req.method === 'POST') {
//     const artist = await prisma.artist.create({
//       data: req.body,
//     })
//     res.json(artist)
//   } else {
//     res.send('Unsupported method')
//   }
// }

export async function POST(req: NextRequest, { params: { id } }: { params: { id: string }}) {
  // const formData = await req.formData() as Prisma


  // const artist = await prisma.artist.create({
  //   data: formData,
  // })
}