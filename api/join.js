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

router.get("/joinTwo", async (req, res) => {
  try {
    const result = await pool.query(
        "SELECT guests.id, guests.email, reservations.id, reservations.price, reservations.room_id FROM guests INNER JOIN reservations on guests.id = reservations.guest_id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

router.get("/joinThree", async (req, res) => {
  try {
    const result = await pool.query("SELECT guests.id, guests.email, reservations.id, reservations.price, reservations.room_id FROM guests INNER JOIN reservations on guests.id = reservations.guest_id INNER JOIN rooms on reservations.room_id = rooms.id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

router.get("/joinAll", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT guests.id, guests.email, reservations.id, reservations.price, reservations.room_id, housekeeper.id FROM guests INNER JOIN reservations on guests.id = reservations.guest_id INNER JOIN rooms on reservations.room_id = rooms.id INNER JOIN housekeeper on rooms.housekeeper_id = housekeeper.id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router