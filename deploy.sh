docker build -t hishamss/go-meeting-client:latest -t hishamss/go-meeting-client:$SHA -f ./client/Dockerfile ./client
docker build -t hishamss/go-meeting-api:latest -t hishamss/go-meeting-api:$SHA -f ./api/Dockerfile ./api
docker push hishamss/go-meeting-client:latest
docker push hishamss/go-meeting-api:latest
docker push hishamss/go-meeting-client:$SHA
docker push hishamss/go-meeting-api:$SHA
kubectl apply -f k8s
kubectl set image deployments/api-deployment api=hishamss/go-meeting-api:$SHA
kubectl set image deployments/client-deployment client=hishamss/go-meeting-client:$SHA
