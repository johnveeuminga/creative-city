import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com',
        },
    });

    // Create artworks
    await prisma.artwork.createMany({
        data: [
            {
                name: 'Artwork 1',
                description: 'Description of Artwork 1',
                artist_id: user1.id,
            },
            {
                name: 'Artwork 2',
                description: 'Description of Artwork 2',
                artist_id: user2.id,
            },
        ],
        skipDuplicates: true,
    });
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
