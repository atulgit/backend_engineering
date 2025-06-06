import { Client } from 'cassandra-driver';
import dotenv from 'dotenv';
dotenv.config();

export const client = new Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINTS],
  localDataCenter: 'datacenter1',
  keyspace: process.env.CASSANDRA_KEYSPACE,
});

await client.connect();
console.log('Connected to Cassandra');
