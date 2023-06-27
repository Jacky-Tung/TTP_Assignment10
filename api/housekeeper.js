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
    const result = await pool.query("SELECT * FROM housekeeper");
    res.json(result.rows)
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const housekeeper = await pool.query(
      "INSERT INTO housekeeper (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(housekeeper.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
