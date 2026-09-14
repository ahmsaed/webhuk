import { Worker } from 'bullmq';
import { config } from "dotenv";


config();


const connection = {
  host: 'redis-12471.c212.ap-south-1-1.ec2.cloud.redislabs.com',
  port: 12471,
  username: 'default',
  password: process.env.REDIS_PASS,
}

export const myWorker = new Worker('myqueue', async job => {
    const {subscriberUrl, payload} = job.data
    const res = await fetch(subscriberUrl, { method: 'POST', body: JSON.stringify(payload) })
    if (!res.ok) throw new Error("failed!")
}, { connection })


