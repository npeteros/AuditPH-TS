import { PrismaClient } from '@prisma/client';
import { budget_types } from '../src/lib/data-placeholder';

const prisma = new PrismaClient()
async function main() {
    const budgetTypesData = budget_types.map(({ typeName, color }) => ({ typeName, color }));
    const budgetTypes = await prisma.budgetType.createMany({
        data: budgetTypesData
    })
    console.log({budgetTypes})
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })