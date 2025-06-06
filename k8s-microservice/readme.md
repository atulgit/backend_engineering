# Example for inventory-service
docker build -t inventory-service:latest inventory-service/.
docker build -t product-catalog-service:latest product-catalog-service/.
docker build -t warehouse-service:latest warehouse-service/.
docker build -t realtime-inventory-service:latest realtime-inventory-service/.


k3d image import inventory-service:latest -c ecommerce-cluster
k3d image import product-catalog-service:latest -c ecommerce-cluster
k3d image import warehouse-service:latest -c ecommerce-cluster
k3d image import realtime-inventory-service:latest -c ecommerce-cluster


k3d cluster list
k3d cluster delete ecommerce-cluster
k3d cluster create ecommerce-cluster --agents 2
k3d cluster list
kubectl get nodes


k3d cluster create ecommerce-cluster \
  --agents 2 \
  -p "3001:3001@loadbalancer" \
  -p "3002:3002@loadbalancer" \
  -p "3003:3003@loadbalancer" \
  -p "3004:3004@loadbalancer" 

kubectl apply -f namespace.yaml
kubectl apply -f inventory-service
kubectl apply -f product-catalog-service
kubectl apply -f warehouse-service
kubectl apply -f realtime-inventory-service

kubectl port-forward inventory-service 3001:3001
kubectl port-forward product-catalog-service 3002:3002
kubectl port-forward warehouse-service 3003:3003

kubectl port-forward svc/inventory-service 3001:3001 -n ecommerce
kubectl port-forward svc/product-catalog-service 3002:3002 -n ecommerce
kubectl port-forward svc/warehouse-service 3003:3003 -n ecommerce
kubectl port-forward svc/realtime-inventory-service 3004:3004 -n ecommerce

kubectl get pods -n ecommerce
kubectl get svc -n ecommerce

kubectl logs inventory-service-6d784498f8-k8xfg  -n ecommerce

On Linux: expose MongoDB to 0.0.0.0 and use your actual IP or bridge network.





