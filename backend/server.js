import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import { hashSync } from "bcryptjs";
import multer from 'multer';
import path from 'path';
const {Pool} = pkg;





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/')
  },
  filename: function (req, file, cb) {
    cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
  }
});

const upload = multer({ 
  storage: storage
});





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

app.get('/api/lastn', async (req, res) => {
  try {
    const n = parseInt(req.query.n)
    const result = await pool.query(
      "select * from public.Document order by doc_id desc limit $1",
      [n]
    );
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dep_docs', async (req, res) => {
  try {
    const department_id = parseInt(req.query.department_id)
    const result = await pool.query(
      "select d.doc_id, d.name, d.filename from public.DocumentDepartment dd join public.Document d on dd.doc_id = d.doc_id where dd.department_id = $1 order by doc_id desc",
      [department_id]
    );
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dep_docs_lastn', async (req, res) => {
  try {
    const to_send = []
    for(let dep_id of [1,2,3]){
      const result = await pool.query(
        "select d.doc_id, d.name, d.filename from public.DocumentDepartment dd join public.Document d on dd.doc_id = d.doc_id where dd.department_id = $1 order by doc_id desc limit 3",
        [dep_id]
      );
      to_send.push({
        department_id: dep_id,
        docs: result.rows
      })
    }
    console.log(to_send)
    res.json(to_send);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/upload_doc', upload.single('file'), async (req, res) => {
  try{
    await pool.query(
      "insert into public.Document values (default, $1, $2);",
      [req.body.name, req.file.filename]
    )
    console.log('added', req.body.name, req.file.filename)
    const result_doc_id = await pool.query("select max(doc_id) from public.Document")
    console.log('pulling doc_id', result_doc_id)
    const doc_id = result_doc_id.rows[0].max
    for(let dep_id of req.body.department_ids){
      await pool.query(
        "insert into public.DocumentDepartment values ($1, $2);",
        [doc_id, dep_id]
      )
    }
    console.log('added department ids', req.body.department_ids)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
  
  res.sendStatus(200);
});




app.listen(3001, () => {
    console.log('Server running on port 3001')
});