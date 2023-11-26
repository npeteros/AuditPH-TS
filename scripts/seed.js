const { db } = require('@vercel/postgres');
const { budget_types } = require('../src/lib/data-placeholder');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "invoices" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                income DOUBLE PRECISION NOT NULL DEFAULT 0.00,
                expenses DOUBLE PRECISION NOT NULL DEFAULT 0.00,
                goals INT NOT NULL DEFAULT 0,
                budgets INT NOT NULL DEFAULT 0,
                moneySaved INT NOT NULL DEFAULT 0,
                transactions INT NOT NULL DEFAULT 0,
                totalBalance DOUBLE PRECISION NOT NULL DEFAULT 0.00
            );
        `;

        console.log(`Created "users" table`); 

        return createTable;
    } catch(error) {
        console.error('Error seeding users: ', error);
        throw error;
    }
}

async function seedBudgetTypes(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS budgetTypes (
                id SERIAL PRIMARY KEY,
                typeName TEXT NOT NULL,
                color TEXT NOT NULL
            );
        `;

        console.log(`Created "budgetTypes" table`);

        const insertedTypes = await Promise.all(
            budget_types.map(
                (type) => client.sql`
                    INSERT INTO budgetTypes (id, typeName, color)
                    VALUES (${type.id}, ${type.name}, ${type.color})
                    ON CONFLICT (id) DO NOTHING;
                `,
            ),
        );

        console.log(`Seeded ${insertedTypes.length} budget types`);

        return {
            createTable,
            types: insertedTypes,
        };
    } catch(error) {
        console.error('Error seeding budget types: ', error);
        throw error;
    }
}

async function seedBudgets(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS budgets (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                userId UUID,
                budgetTypeId INT,
                budgetTotal DOUBLE PRECISION NOT NULL DEFAULT 0.00,
                budgetCurrent DOUBLE PRECISION NOT NULL DEFAULT 0.00,
                CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id) ON DELETE SET NULL,
                CONSTRAINT fk_budget FOREIGN KEY(budgetTypeId) REFERENCES budgetTypes(id) ON DELETE SET NULL
            );
        `;

        console.log(`Created "budgets" table`);

        return createTable;
    } catch(error) {
        console.error('Error seeding budgets: ', error);
        throw error;
    }
}

async function seedGoals(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS goals (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                userId UUID,
                goalName TEXT NOT NULL,
                goalCurrent INT NOT NULL DEFAULT 0,
                goalTarget INT NOT NULL,
                CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id) ON DELETE SET NULL
            );
        `;

        console.log(`Created "goals" table`);

        return createTable;
    } catch(error) {
        console.error('Error seeding goals: ', error);
        throw error;
    }
}

async function seedTransactions(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS transactions (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                userId UUID NOT NULL,
                budgetTypeId INT NOT NULL,
                goalId UUID DEFAULT NULL,
                transactioName TEXT NOT NULL,
                transactionAmount INT NOT NULL,
                CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id) ON DELETE SET NULL,
                CONSTRAINT fk_budget FOREIGN KEY(budgetTypeId) REFERENCES budgetTypes(id) ON DELETE SET NULL,
                CONSTRAINT fk_goal FOREIGN KEY(goalId) REFERENCES goals(id) ON DELETE SET NULL
            );
        `;

        console.log(`Created "transactions" table`);

        return createTable;
    } catch (error) {
        console.error('Error seeding transactions: ', error);
        throw error;
    }
}

async function dropAllTables(client) {
    try {
        const dropTables = await client.sql`
            DROP TABLE transactions;
            DROP TABLE goals;
            DROP TABLE budgets;
            DROP TABLE budgetTypes;
            DROP TABLE budget_types;
            DROP TABLE users;
        `;

        console.log(`Dropped all tables`);
        return dropTables;
    } catch (error) {
        console.error('Error dropping tables: ', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedBudgetTypes(client);
    await seedBudgets(client);
    await seedGoals(client);
    await seedTransactions(client);

    // await dropAllTables(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database: ',
        err,
    );
});