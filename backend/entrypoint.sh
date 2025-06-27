#!/bin/bash

set -e

while ! pg_isready -h postgres -p 5432 -U admin; do
echo "Postgres is unavailable - sleeping"
sleep 2
done

npx prisma migrate deploy
