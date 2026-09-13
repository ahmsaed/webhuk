import express from "express";
import { Pool } from "pg";
import { config } from "dotenv";
import { Request, Response } from "express";

config();

interface webhookBody {
  event_type: string;
  payload: {
    message: string;
    timestamp: string;
  };
}

interface subBody {
  event_type: string;
  is_active: boolean;
  subscriber_url: string;
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const app = express();

app.use(express.json());

app.post("/subscribe", async (req: Request, res: Response) => {
  const body: subBody = req.body;
  const dbResult = await pool.query(
    `INSERT INTO subscribers(event_type, is_active, subscriber_url) VALUES($1,$2,$3) RETURNING *`,
    [body.event_type, body.is_active, body.subscriber_url],
  );
  res.send(dbResult.rows);
});

app.post("/webhook", async (req: Request, res: Response) => {
  const body: webhookBody = req.body;
  const dbResult = await pool.query(
    `INSERT INTO event_deliveries(status, subscriber_id, payload) 
     SELECT 'pending', id, $1 FROM subscribers WHERE event_type = $2
     AND is_active = true RETURNING *;`,
    [body.payload, body.event_type],
  );
  res.send(dbResult.rows);
});

app.listen(3000, () => console.log("it works!"));
