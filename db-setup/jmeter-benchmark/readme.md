jmeter -n -t /path/to/testplan.jmx -l /path/to/results.jtl

docker run --rm -v $(pwd)/jmeter:/jmeter \
  -w /jmeter \
  justb4/jmeter \
  -n -t postgres_test.jmx -l postgres_results.jtl

Open JMeter in Mac
-------------------
open /opt/homebrew/bin/jmeter

docker build -t postgres-jmeter:postgres .
docker build -t postgres-jmeter:postgres -f DockerfilePostgres .
docker build -t mongo-jmeter:mongo -f DockerfileMongo .

docker logs <your-jmeter-container>

docker exec -it <your-jmeter-container> ls /opt/apache-jmeter-5.6.3/lib/ext

docker run -it --entrypoint /bin/bash <image-name>

docker exec -it [container-id] bash
