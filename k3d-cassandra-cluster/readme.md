k3d cluster delete cassandra-cluster
kubectl create namespace cassandra-db
k3d cluster create cassandra-cluster \
  --agents 3 \
  --servers 1 \
  --port "8080:80@loadbalancer" \
  --port "30000-30010:30000-30010@agent:0"

kubectl config use-context k3d-cassandra-cluster

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack

helm install cassandra bitnami/cassandra \
  --set metrics.enabled=true \
  --set replicaCount=3 \
  --set dbUser.user=admin \
  --set dbUser.password=pass \
  --set persistence.size=1Gi

kubectl port-forward --namespace cassandra-db svc/cassandra 9042:9042 &
   cqlsh -u admin -p $CASSANDRA_PASSWORD 127.0.0.1 9042

kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9091:9090
kubectl port-forward svc/prometheus-grafana 3000:80

Replication and Partitioning Script
------------------------------------
CREATE KEYSPACE testks WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 3
};

USE testks;

CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT
);

-------------------------------------

🧹 Cleanup (if needed)
----------------------
bash
Copy
Edit
helm uninstall cassandra
helm uninstall prometheus
k3d cluster delete cassandra-cluster

Other Commands
--------------
k3d cluster stop cassandra-cluster
k3d cluster start cassandra-cluster
kubectl get nodes -o wide
kubectl get pods -A -o wide
lsof -i :9042
kill -9 28772