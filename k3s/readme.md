k3d cluster delete pg-cluster
k3d cluster create pg-cluster \
  --api-port 6550 \
  --port "5432:30032@loadbalancer" \
  --agents 1
kubectl create namespace ns-pg-cluster
kubectl apply -f prometheus.yml
kubectl apply -f deployment-postgres.yaml
kubectl apply -f deployment-postgres-exporter.yaml
kubectl apply -f deployment-prometheus.yaml

kubectl port-forward svc/prometheus-service 9090:9090 -n ns-pg-cluster

kubectl get pods -n ns-pg-cluster