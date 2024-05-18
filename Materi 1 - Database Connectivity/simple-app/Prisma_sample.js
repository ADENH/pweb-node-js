// Import Prisma Client
const { PrismaClient } = require('@prisma/client');

// Instantiate Prisma Client
const prisma = new PrismaClient();

// Example usage
async function main() {
  // Create a new user
  const newUser = await prisma.UserPrisma.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  });
  console.log('Created user:', newUser);

  // Retrieve all users
  const allUsers = await prisma.UserPrisma.findMany();
  console.log('All users:', allUsers);
}

// Call the main function
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // Close Prisma Client connection when done
    await prisma.$disconnect();
  });
