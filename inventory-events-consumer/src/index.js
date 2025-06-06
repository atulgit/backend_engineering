import { consumer } from './kafka.js';
import cassandraClient from './cassandra.js';

async function run() {
  await cassandraClient.connect();
  console.log('Connected to Cassandra');

  await consumer.connect();
  console.log('Kafka consumer connected');

  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());

      const { sku, warehouse_id, quantity, reserved_quantity, ts } = event;

      try {
        // Update inventory_by_sku_warehouse
        await cassandraClient.execute(
          `UPDATE inventory_by_sku_warehouse 
           SET quantity = ?, reserved_quantity = ?, updated_at = ?
           WHERE sku = ? AND warehouse_id = ?`,
          [quantity, reserved_quantity, new Date(ts), sku, warehouse_id]
        );

        // Insert into inventory_events (event sourcing)
        await cassandraClient.execute(
          `INSERT INTO inventory_events (sku, warehouse_id, quantity, reserved_quantity, ts)
           VALUES (?, ?, ?, ?, ?)`,
          [sku, warehouse_id, quantity, reserved_quantity, new Date(ts)]
        );

        console.log(`Inventory updated for SKU: ${sku} in Warehouse: ${warehouse_id}`);
      } catch (err) {
        console.error('Failed to update inventory:', err);
      }
    }
  });
}

run().catch(console.error);
