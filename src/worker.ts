import { Worker } from 'bullmq';
import { config } from "dotenv";
import pool from "./db.js";

config();


const connection = {
  host: 'redis-12471.c212.ap-south-1-1.ec2.cloud.redislabs.com',
  port: 12471,
  username: 'default',
  password: process.env.REDIS_PASS,
}

export const myWorker = new Worker('myqueue', async job => {
console.log('job data:', job.data)
    const {eventDeliveryId, subscriberUrl, payload} = job.data
    const res = await fetch(subscriberUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
     await pool.query(
    'INSERT INTO attempts (event_delivery_id, attempt_number, response_status) VALUES ($1, $2, $3)',
    [eventDeliveryId, job.attemptsMade + 1, res.status]
  );
  if (!res.ok) throw new Error('failed!'); 
     await pool.query(
    'UPDATE event_deliveries SET status = $1 WHERE id = $2',
    ['success', eventDeliveryId]
  );
}, { connection })


