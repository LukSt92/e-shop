# E-Shop

An e-commerce application with user registration, login, and full CRUD management. The project is built using Next.js 15, React, and NextAuth v5 with a backend powered by Prisma ORM and a PostgreSQL database running in a Docker container.

## Features
- User registration and login (NextAuth v5)
- Full CRUD operations with database: create, read, update, delete using PostgreSQL
- Integrated backend and frontend in a single project
- Containerized setup using Docker and Docker Compose

## Technologies
- Next.js 15
- React
- NextAuth v5
- Prisma ORM
- PostgreSQL
- Docker


## System Requirements
- Node.js version 18 or higher
- Docker Desktop
- Git

## Environment Variables
Required environment variables to run the project:
```
POSTGRES_URL="postgres://postgres:postgres@localhost:5433"
DB_HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET= "randomstring"
```
## Installation
1. Clone the repository:
```
git clone <repository-url>
cd e-shop
```
2. Install dependencies:
```
npm install
```
3. Start Docker containers:
```
docker compose up
```
4. Generate Prisma client:
```
npx prisma generate
```
5. Run database migrations:
```
npx prisma migrate dev
```
6. Seed initial data:
```
npm run seed
```
7. Start the development server:
```
npm run dev
```
