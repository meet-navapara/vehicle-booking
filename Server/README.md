# Backend (Server)

## Environment Variables

Create a `.env` file in the `Server` directory with the following variables:

```
DB_NAME=vehicle           # Name of your PostgreSQL database
DB_USER=postgres         # Database username
DB_PASSWORD=             # Database password
DB_HOST=localhost        # Database host
DB_PORT=5432             # Database port
PORT=5000                # Port for the backend server (optional, default is 8080)
```

Update these values as needed for your local setup.

---

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Seed the database (if required):
   ```bash
   node seeders/seed.js
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
