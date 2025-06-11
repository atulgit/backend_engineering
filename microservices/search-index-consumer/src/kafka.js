import { Kafka } from 'kafkajs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });
// dotenv.config();

const kafka = new Kafka({
  clientId: 'inventoryapp',
  brokers: ["localhost:29092"],
});

export const consumer = kafka.consumer({ groupId: 'search-index-group' });
