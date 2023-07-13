const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {

    for (let i = 1; i <= 4; i++) {
        const newArtwork = await prisma.artwork.create({
            data: {
                name: `Artwork ${i}`,
                description: `This is a description for Artwork ${i}`,
                artist_id: 1,
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
