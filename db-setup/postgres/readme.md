-- WAREHOUSE
CREATE TABLE warehouses (
    warehouse_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    capacity INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCT CATEGORIES
CREATE TABLE categories (
    category_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    parent_category_id UUID
);

-- INVENTORY MASTER
CREATE TABLE inventory_master (
    inventory_id UUID PRIMARY KEY,
    product_id UUID REFERENCES products(product_id),
    warehouse_id UUID REFERENCES warehouses(warehouse_id),
    quantity INT NOT NULL,
    reserved_quantity INT DEFAULT 0,
    restock_threshold INT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (product_id, warehouse_id)
);

-- SUPPLIERS
CREATE TABLE suppliers (
    supplier_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    contact_email TEXT,
    contact_phone TEXT
);

-- SUPPLY ORDERS
CREATE TABLE supply_orders (
    order_id UUID PRIMARY KEY,
    supplier_id UUID REFERENCES suppliers(supplier_id),
    product_id UUID REFERENCES products(product_id),
    warehouse_id UUID REFERENCES warehouses(warehouse_id),
    quantity_ordered INT NOT NULL,
    expected_delivery_date TIMESTAMP,
    status TEXT CHECK (status IN ('PENDING', 'DELIVERED', 'CANCELLED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

