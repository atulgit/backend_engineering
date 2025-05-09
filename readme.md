#Command for executing nosqlbench workload#
-------------------------------------------
./opt/java/openjdk/bin/java -jar nb5.jar run driver=cql workload=test-plans/price_history.yaml tags=phase:insert cycles=1000 host=cassandra localdc=dc1

Query to insert Data
--------------------
CREATE TABLE "product_views_by_user" ( 
  "product_id" UUID ,
  "recorded_at" TIMESTAMP ,
  "price" DOUBLE ,
  "currency" TEXT ,
   PRIMARY KEY ("product_id")
);