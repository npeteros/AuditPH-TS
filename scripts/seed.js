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
                money_saved INT NOT NULL DEFAULT 0,
                transactions INT NOT NULL DEFAULT 0,
                total_balance DOUBLE PRECISION NOT NULL DEFAULT 0.00
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
            CREATE TABLE IF NOT EXISTS budget_types (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                color TEXT NOT NULL
            );
        `;

        console.log(`Created "budget_types" table`);

        const insertedTypes = await Promise.all(
            budget_types.map(
                (type) => client.sql`
                    INSERT INTO budget_types (id, name, color)
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
                user_id UUID NOT NULL,
                budget_type_id INT NOT NULL,
                budget_total DOUBLE PRECISION NOT NULL DEFAULT 0.00,
                budget_current DOUBLE PRECISION NOT NULL DEFAULT 0.00,
                CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
                CONSTRAINT fk_budget FOREIGN KEY(budget_type_id) REFERENCES budget_types(id) ON DELETE SET NULL
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
                user_id UUID NOT NULL,
                name TEXT NOT NULL,
                current INT NOT NULL DEFAULT 0,
                target INT NOT NULL,
                CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
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
                user_id UUID NOT NULL,
                budget_type_id INT NOT NULL,
                goal_id UUID DEFAULT NULL,
                name TEXT NOT NULL,
                amount INT NOT NULL,
                CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
                CONSTRAINT fk_budget FOREIGN KEY(budget_type_id) REFERENCES budget_types(id) ON DELETE SET NULL,
                CONSTRAINT fk_goal FOREIGN KEY(goal_id) REFERENCES goals(id) ON DELETE SET NULL
            );
        `;

        console.log(`Created "transactions" table`);

        return createTable;
    } catch (error) {
        console.error('Error seeding transactions: ', error);
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

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database: ',
        err,
    );
});