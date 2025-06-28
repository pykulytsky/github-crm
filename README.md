# github-crm

## Quickstart (with Docker Compose)

### 1. Clone the repository

```bash
git clone https://github.com/pykulytsky/github-crm.git
cd github-crm
```

### 2. Start all services

```bash
docker-compose up --build
```

This will start:
- frontend (Vite + React) on http://localhost:5173
- backend (NestJS) on http://localhost:3000
- PostgreSQL on port 5432

## Environment Variables

`docker-compose` is already configured with sufficient environment variables,
but if you want to run the app outside of docker you can set your variables
in `.env` file. Example files are located in both FE and BE folders.

## Note on architecture
BE tries to follow Clean Architecture but wihout compromising simplicity as this is
very small app. However, this setup allows for easy extensions of functionality,
like adding additional sources for repositories (Gitlab, Bitbucket, Sourcehat etc).
