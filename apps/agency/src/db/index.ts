import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { relations } from './relations';
import { remember } from '@epic-web/remember';
import { env } from '@/lib/env/server';

const createPool = () => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    min: 0,
    max: 10,
  });

  pool.on('error', (error) => {
    console.log('Pool Error', JSON.stringify(error, null, 2));
  });

  return pool;
};

let client: Pool;

if (process.env.NODE_ENV === 'development') {
  client = remember('DB Pool', () => createPool());
} else {
  client = createPool();
}

const db = drizzle({ client, relations, logger: true });
export default db;
export * as schema from './schema';
