import { Client } from '@elastic/elasticsearch';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
// dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

export const esClient = new Client({
  node: process.env.ELASTICSEARCH_NODE,
});
