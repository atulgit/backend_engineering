docker exec -it percona-mongodb mongosh -u root -p password --authenticationDatabase admin
rs.initiate()
rs.status()

mongodb://root:password@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.5.0