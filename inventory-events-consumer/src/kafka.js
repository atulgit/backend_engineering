import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
dotenv.config();

const kafka = new Kafka({
  clientId: 'inventory-events-consumer',
  brokers: [process.env.KAFKA_BROKER],
});

export const consumer = kafka.consumer({ groupId: 'inventory-group' });
