import { consumer } from './kafka.js';
import { esClient } from './elastic.js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await consumer.connect();
  console.log('Kafka consumer connected');

  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      const { type, payload } = event;

      try {
        if (type === 'product_created' || type === 'product_updated') {
          const { product_id, name, description, category, price, sku } = payload;

          await esClient.index({
            index: process.env.ELASTICSEARCH_INDEX,
            id: product_id,
            document: {
              product_id,
              name,
              description,
              category,
              price,
              sku,
              updated_at: new Date()
            }
          });

          console.log(`Indexed ${type} event for product: ${product_id}`);
        }

        if (type === 'product_deleted') {
          await esClient.delete({
            index: process.env.ELASTICSEARCH_INDEX,
            id: payload.product_id,
          });

          console.log(`Deleted product from index: ${payload.product_id}`);
        }
      } catch (err) {
        console.error('Error indexing to Elasticsearch:', err);
      }
    }
  });
}

run().catch(console.error);
