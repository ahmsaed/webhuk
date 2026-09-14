import express from "express";
import router from "./routes/routes.js"
import { createClient } from 'redis';
import { config } from "dotenv";


config();

const app = express();

app.use(express.json());

app.use("/", router);

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-12471.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 12471
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar


app.listen(3000, () => console.log("it works!"));


export default app;