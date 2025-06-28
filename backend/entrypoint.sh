#!/bin/bash

set -e

npx prisma migrate deploy

node dist/main.js
