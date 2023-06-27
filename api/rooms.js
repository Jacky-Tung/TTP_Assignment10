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

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rooms');
        res.json(result.rows)
    } catch (error) {
        console.error(error)
    }
})

router.post('/', async (req, res)=> {
    try {
        const {type, total_occupancy, total_beds, total_bathrooms, housekeeper_id} = req.body;
        const room = await pool.query("INSERT INTO rooms (type, total_occupancy, total_beds, total_bathrooms, housekeeper_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [type, total_occupancy, total_beds, total_bathrooms, housekeeper_id]);
        res.json(room.rows[0])
    } catch (error) {
        console.error(error)
    }
})

module.exports = router