k3d cluster delete  mongo-cluster
k3d cluster create mongo-cluster --servers 1 --agents 2 -p "30017:30017@loadbalancer" --k3s-arg "--disable=traefik@server:0"
kubectl config use-context k3d-mongo-cluster

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

kubectl create namespace mongo-db

helm install mongodb-sharded bitnami/mongodb-sharded -n mongo-db -f k8s-mongodb-cluster/mongodb/mongodb-sharded-values.yaml
helm install prometheus bitnami/prometheus -n mongo-db -f k8s-mongodb-cluster/prometheus/values.yaml


Other Commands
---------------
helm upgrade mongodb-sharded bitnami/mongodb-sharded -n mongo-db -f k8s-mongodb-cluster/mongodb/mongodb-sharded-values.yaml
kubectl describe pod mongodb-sharded-configsvr-0 -n mongo-db  
kubectl get pods -n mongo-db
kubectl get svc -n mongo-db