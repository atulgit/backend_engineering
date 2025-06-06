import cassandra from 'cassandra-driver';
import dotenv from 'dotenv';
dotenv.config();

const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINTS],
  localDataCenter: 'datacenter1',
  keyspace: process.env.CASSANDRA_KEYSPACE
});

export default client;
