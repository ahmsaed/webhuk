import pool from "../db.js";

const demo = async (req, res) => {
  const { rows } = await pool.query(`
    SELECT d.id, d.status, d.subscriber_id, 
           array_agg(a.response_status ORDER BY a.attempt_number) as attempts
    FROM event_deliveries d
    LEFT JOIN attempts a ON a.event_delivery_id = d.id
    GROUP BY d.id
    ORDER BY d.id DESC
  `);
  res.json(rows);
}

export default demo;