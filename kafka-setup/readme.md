docker exec -it kafka1 kafka-console-producer --broker-list localhost:9092 --topic your-topic-name

docker exec -it kafka1 kafka-console-consumer \
  --bootstrap-server kafka1:9092 \
  --topic your-topic-name \
  --from-beginning

  docker exec -it kafka1 kafka-console-consumer \
  --bootstrap-server kafka1:9092 \
  --topic your-topic-name \
  --from-beginning \
  --group my-consumer-group











--------Rought Work-------------------------
docker exec -it kafka1 kafka-console-producer --broker-list localhost:9092 --topic warehouse

docker exec -it kafka1 kafka-console-consumer \
  --bootstrap-server kafka1:9092 \
  --topic warehouse \
  --from-beginning

  docker exec -it kafka1 kafka-console-producer \
  --broker-list kafka1:9092 \
  --topic warehouse

  docker exec -it kafka1 kafka-console-consumer \
  --bootstrap-server kafka1:9092 \
  --topic new_topic \
  --from-beginning \
  --group warehouse-group

  docker exec -it kafka2 kafka-console-consumer \
  --bootstrap-server kafka2:9093 \
  --topic new_topic \
  --from-beginning \
  --group warehouse-group

   docker exec -it kafka1 kafka-console-consumer \
   --bootstrap-server kafka1:9092 \
   --topic your-topic-name \
   --group my-consumer-group \
   --from-beginning

  docker exec -it kafka1 kafka-topics --create \
  --bootstrap-server kafka1:9092 \
  --replication-factor 1 \
  --partitions 3 \
  --topic your-topic-name



  docker exec -it kafka1  kafka-configs --bootstrap-server kafka1:9092 --entity-type brokers --entity-name 1 --describe
