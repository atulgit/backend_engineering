docker compose up -d
docker compose up -d grafana
docker-compose down -v


docker build -t postgres -f DockerfilePostgres .
docker exec -it [container-id] bash
docker exec -it pg_backrest pgbackrest --stanza=main stanza-create
docker exec pg_backrest pgbackrest --stanza=main start
docker exec -it pg_backrest pgbackrest --stanza=main backup
docker exec -it postgres bash
docker exec -it <container_name_or_id> bash
docker exec pg_backrest pgbackrest --stanza=main archive-push /var/lib/postgresql/data/pg_wal/00000001000000000000000D
docker exec pg_backrest ls -l /var/lib/postgresql/data/pg_wal/00000001000000000000000D
docker exec -it pg_backrest bash
docker exec -it pg_backrest psql -U user -d postgres -c "SHOW log_directory;"
docker exec -it pg_backrest psql -U user -d postgres -c "SHOW log_filename;"
docker exec pg_backrest which pgbackrest

SHOW archive_command;
postgresql-%Y-%m-%d_%H%M%S.log

docker exec -it postgres psql -U user -c "SHOW log_directory;"
docker exec -it postgres psql -U postgres -c "SHOW log_filename;"
docker exec -it postgres psql -U postgres -c "SHOW data_directory;"

MongoDB
--------
docker exec -it pbm-agent pbm status

docker exec -it mongo mongosh --eval '
db.getSiblingDB("admin").createUser({
  user: "pbmuser",
  pwd: "pbmpassword",
  roles: [
    { role: "readWrite", db: "admin" },
    { role: "backup", db: "admin" },
    { role: "restore", db: "admin" }
  ]
})
'

docker exec -it mongo mongosh --eval '
rs.initiate({
  _id: "rs0",
  members: [{ _id: 0, host: "mongo:27017" }]
})'


docker restart pbm-agent
docker exec -it mongo mongosh --eval 'rs.status()'

docker exec -it mongo mongosh --eval 'rs.conf()'
docker exec -it pbm-agent pbm backup

docker exec -it mongo mongosh




docker exec -it pbm-cli pbm config \
  --mongodb-uri="mongodb://root:password@percona-mongodb:27017/admin" \
  --set storage.type=filesystem \
  --set storage.filesystem.path=/pbm/backups \
  --set compression.algorithm=zstd


