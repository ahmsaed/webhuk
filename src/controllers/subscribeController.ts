import pool from "../db.js"
import {Request, Response} from "express";

interface subBody {
  event_type: string;
  is_active: boolean;
  subscriber_url: string;
}

const subscribe = async (req: Request, res: Response) => {
  const body: subBody = req.body;
  console.log(body);
  const dbResult = await pool.query(
    `INSERT INTO subscribers(event_type, is_active, subscriber_url) VALUES($1,$2,$3) RETURNING *`,
    [body.event_type, body.is_active, body.subscriber_url],
  );
  res.send(dbResult.rows);
}

export default subscribe;
