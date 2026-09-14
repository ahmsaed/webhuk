import { Queue } from 'bullmq';

const connection = {
  host: 'redis-12471.c212.ap-south-1-1.ec2.cloud.redislabs.com',
  port: 12471,
  username: 'default',
  password: process.env.REDIS_PASS,
}


export const myQueue = new Queue('myqueue', { connection })