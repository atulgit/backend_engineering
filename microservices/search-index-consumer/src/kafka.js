import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
dotenv.config();

const kafka = new Kafka({
  clientId: 'search-index-consumer',
  brokers: [process.env.KAFKA_BROKER],
});

export const consumer = kafka.consumer({ groupId: 'search-index-group' });
