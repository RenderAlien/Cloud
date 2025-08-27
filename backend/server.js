import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import { hashSync } from "bcryptjs";
const {Pool} = pkg;

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sumpractice2025',
  password: 'postgres',
  port: 5432,
});

app.get('/api/authentificate', async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;
    const result = await pool.query(
      "select user_id, first_name, second_name, third_name, department_id from public.User where email = $1 and password = $2 limit 1",
      [email, hashSync(password, '$2b$10$wrmUUUhh9wBj4Zce8osQOO')]
    );
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
    console.log('Server running on port 3001')
});