import { Client } from 'pg';

async function createSchema(): Promise<void> {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'autism_app',
        user: 'postgres',
        password: 'postgres123',
    });

    await client.connect();
    await client.query('CREATE SCHEMA IF NOT EXISTS strapi');
    console.log('✅ Schema "strapi" created successfully!');
    await client.end();
}

createSchema().catch((err: Error) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
