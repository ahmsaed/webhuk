# Webhook Delivery System

A simple TypeScript app for receiving webhook events and sending them to subscribed endpoints.

## Demo

<video src="./images/webhuk.webm" controls autoplay muted loop playsinline></video>

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

## Notes

This is a basic webhook delivery system for learning and testing async job processing.
