import { Kafka } from 'kafkajs';
// const { Kafka, logLevel } = require('kafkajs');
// const { Kafka } = require('kafkajs');
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// const kafka = new Kafka({
//   brokers: [process.env.KAFKA_BROKER],
// });

const kafkaConfig = {
  clientId: "inventoryapp",
  brokers: ["localhost:29092"],
};

const kafka = new Kafka(kafkaConfig);

const producer = kafka.producer();
await producer.connect();

export const produceInventoryEvent = async (event) => {
  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [{ value: JSON.stringify(event) }],
  });
};
