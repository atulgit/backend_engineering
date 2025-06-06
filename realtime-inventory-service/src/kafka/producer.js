import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
dotenv.config();

// const kafka = new Kafka({
//   brokers: [process.env.KAFKA_BROKER],
// });

// const producer = kafka.producer();
// await producer.connect();

// export const produceInventoryEvent = async (event) => {
//   await producer.send({
//     topic: process.env.KAFKA_TOPIC,
//     messages: [{ value: JSON.stringify(event) }],
//   });
// };
