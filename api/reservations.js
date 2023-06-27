const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "assignment10",
  user: "jackytung",
  password: "",
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reservations");
    res.json(result.rows)
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      price,
      room_id,
      guest_id,
    } = req.body;
    const reservation = await pool.query(
      "INSERT INTO reservations (price, room_id, guest_id) VALUES ($1, $2, $3) RETURNING *",
      [price, room_id, guest_id]
    );
    res.json(reservation.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
