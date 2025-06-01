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
  --topic warehouse \
  --from-beginning \
  --group warehouse-group
