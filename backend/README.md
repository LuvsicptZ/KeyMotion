# KeyMotion Backend

NestJS API for KeyMotion typing test application.

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/keymotion"
JWT_SECRET="your-secret-key-at-least-32-chars"
```

| Variable       | Description                          |
|----------------|--------------------------------------|
| `DATABASE_URL` | PostgreSQL connection string         |
| `JWT_SECRET`   | Secret for signing JWT tokens (min 32 chars) |

## Setup

```bash
npm install
npx prisma migrate dev   # Create database and run migrations
npm run start:dev
```

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run start:dev` | Development with hot reload   |
| `npm run build`     | Build for production         |
| `npm run start:prod`| Run production build         |
| `npm run test`      | Run unit tests               |
| `npm run test:e2e`  | Run e2e tests                |

## API Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user (requires JWT)
- `POST /results` - Submit typing result (requires JWT)
- `GET /results` - Get user results (requires JWT)
- `GET /leaderboard` - Get rankings
