-- REAL-TIME INVENTORY
CREATE TABLE inventory_by_sku_warehouse (
    sku TEXT,
    warehouse_id UUID,
    ts TIMESTAMP,
    available_quantity INT,
    reserved_quantity INT,
    PRIMARY KEY ((sku), warehouse_id, ts)
) WITH CLUSTERING ORDER BY (warehouse_id ASC, ts DESC);

-- This supports:
-- 1. Fast lookup by SKU
-- 2. Real-time analytics across warehouses
-- 3. Time-series inventory view

-- INVENTORY EVENTS
CREATE TABLE inventory_events (
    sku TEXT,
    event_time TIMESTAMP,
    event_type TEXT, -- 'SOLD', 'RESTOCKED', 'RESERVED'
    warehouse_id UUID,
    quantity_changed INT,
    PRIMARY KEY ((sku), event_time)
) WITH CLUSTERING ORDER BY (event_time DESC);
