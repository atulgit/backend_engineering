import { Client } from 'cassandra-driver';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
// dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const client = new Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINTS],
  localDataCenter: 'datacenter1',
  keyspace: process.env.CASSANDRA_KEYSPACE,
});

await client.connect();
console.log('Connected to Cassandra');
