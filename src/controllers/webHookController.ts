import {Request, Response} from "express"
import pool from "../db.js"


interface webhookBody {
  event_type: string;
  payload: {
    message: string;
    timestamp: string;
  };
}

const webHook = async (req: Request, res: Response) => {
  const body: webhookBody = req.body;
  const dbResult = await pool.query(
    `INSERT INTO event_deliveries(status, subscriber_id, payload) 
    SELECT 'pending', id, $1 FROM subscribers WHERE event_type = $2
    AND is_active = true RETURNING *;`,
    [body.payload, body.event_type],
  );
  res.status(202).send(dbResult.rows);
}


export default webHook;