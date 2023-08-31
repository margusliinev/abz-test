import { PrismaClient } from '@prisma/client';
import fakeUsers from './fake_users.json';

const prisma = new PrismaClient();

const positionsData = [
    { id: 1, name: 'Security' },
    { id: 2, name: 'Designer' },
    { id: 3, name: 'Content manager' },
    { id: 4, name: 'Lawyer' },
];

const usersData = fakeUsers;

async function seed() {
    try {
        for (const position of positionsData) {
            await prisma.position.create({
                data: position,
            });
        }
        for (const user of usersData) {
            await prisma.user.create({
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    position_id: user.position_id,
                    registration_timestamp: new Date(user.registration_timestamp),
                    photo: user.photo,
                },
            });
        }

        console.log('Seed data inserted successfully.');
    } catch (err) {
        console.error('Error inserting seed data:', err);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
