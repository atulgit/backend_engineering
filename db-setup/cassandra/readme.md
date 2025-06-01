#Command for executing nosqlbench workload#
-------------------------------------------
./opt/java/openjdk/bin/java -jar nb5.jar run driver=cql workload=test-plans/workload.yaml tags=phase:insert cycles=1000 host=cassandra localdc=datacenter1

./opt/java/openjdk/bin/java -jar nb5.jar run driver=cql workload=test-plans/price_history.yaml cycles=100 host=cassandra localdc=dc1

Other Commands
---------------

docker logs <your-jmeter-container>

docker exec -it <your-jmeter-container> ls /opt/apache-jmeter-5.6.3/lib/ext

docker run -it --entrypoint /bin/bash <image-name>

docker exec -it [container-id] bash


References
-----------
https://medium.com/building-the-open-data-stack/apache-pulsar-performance-testing-with-nosqlbench-3e9816175ba1
https://builddocs.nosqlbench.io/blog/cql-starter/
