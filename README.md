
# Webhuk
A TypeScript app for receiving webhook events and sending them to subscribed endpoints.

## Demo

[webhuk.webm](https://github.com/user-attachments/assets/a03305d0-2421-492e-8983-86c92fef9dca)


## What it does

- Accepts incoming webhook events
- Finds active subscribers for that event type
- Stores each delivery as a pending job
- Sends the payload to subscriber URLs using Redis + BullMQ workers
- Tracks delivery attempts and success/failure status

## Tech used

- Node.js + TypeScript
- Express
- PostgreSQL
- Redis
- BullMQ

## Setup

1. Install dependencies
   - `npm install`
2. Create a `.env` file with your database and Redis credentials
   - `DATABASE_URL=...`
   - `REDIS_PASS=...`
3. Start the app
   - `npm run dev`

## Main routes

- `POST /subscribe` — register a subscriber
- `POST /webhook` — trigger a webhook event
- `GET /deliveries` — view delivery demo data

