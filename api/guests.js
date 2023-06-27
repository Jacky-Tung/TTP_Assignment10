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
    const result = await pool.query("SELECT * FROM guests");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const room = await pool.query(
      "INSERT INTO guests (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(room.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
