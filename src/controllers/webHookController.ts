import {Request, Response} from "express"
import pool from "../db.js"
import {myQueue} from "../queue.js";

interface webhookBody {
  event_type: string;
  payload: {
    message: string;
    timestamp: string;
  };
}

const webHook = async (req: Request, res: Response) => {
  const body: webhookBody = req.body;

  const { rows } = await pool.query(
    `INSERT INTO event_deliveries(status, subscriber_id, payload) 
    SELECT 'pending', id, $1 FROM subscribers WHERE event_type = $2
    AND is_active = true RETURNING *;`,
    [body.payload, body.event_type],
  );

  for (const delivery of rows) {
    const subscriber = await pool.query('SELECT subscriber_url FROM subscribers WHERE id = $1', [delivery.subscriber_id]);

    await myQueue.add('deliver', {
      eventDeliveryId: delivery.id,
      subscriberUrl: subscriber.rows[0].subscriber_url,
      payload: body.payload,
    });
  }

  res.status(202).send('queued');
};

export default webHook;