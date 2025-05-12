#Command for executing nosqlbench workload#
-------------------------------------------
./opt/java/openjdk/bin/java -jar nb5.jar run driver=cql workload=test-plans/price_history.yaml tags=phase:insert cycles=1000 host=cassandra localdc=dc1

./opt/java/openjdk/bin/java -jar nb5.jar run driver=cql workload=test-plans/price_history.yaml cycles=100 host=cassandra localdc=dc1

Reference for NoSQLBench
-------------------------
https://docs.nosqlbench.io/workloads-101/03-data-bindings/

docker exec -it nosqlbench bash
docker exec -it cassandra cqlsh

Cassandra and Prometheus
-------------------------
https://github.com/oleg-glushak/cassandra-prometheus-jmx?tab=readme-ov-file
https://www.alibabacloud.com/blog/observability-%7C-best-practices-for-using-prometheus-to-monitor-cassandra_600555


Query to insert Data
--------------------

CREATE KEYSPACE IF NOT EXISTS ecommerce
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE IF NOT EXISTS ecommerce.product_views_by_user (
    id UUID PRIMARY KEY,
    name text
);

-----------------------------
drop table ecommerce.product_views_by_user;

Grafana Config
--------------
http://prometheus:9090
