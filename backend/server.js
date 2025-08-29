import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import { hashSync } from "bcryptjs";
import multer from 'multer';
import fs from 'fs';
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

app.get('/api/download_by_doc_id', async (req, res) => {
  try {
    const doc_id = parseInt(req.query.doc_id)
    const result = await pool.query(
      'select * from public.Document where doc_id = $1',
      [doc_id]
    )
    const filename = result.rows[0].filename
    console.log(filename)
    const filePath = 'files/' + filename
    
    res.setHeader('Content-Disposition', `attachment; filename="${String(doc_id)+path.extname(filename)}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/doc_search', async (req, res) => {
  try {
    const search_req = req.query.search_req
    const result = await pool.query(
      "select distinct doc_id, name, filename from (select d.doc_id, d.name, d.filename from public.Document d join public.DocumentDepartment dd on d.doc_id = dd.doc_id join public.Department dep on dd.department_id = dep.department_id where strpos(lower(d.name), $1) <> 0 or strpos(lower(dep.name), $1) <> 0) order by doc_id",
      [search_req]
    );
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/request_deletion', async (req, res) => {
  try {
    const doc_id = parseInt(req.query.doc_id)
    const user_id = parseInt(req.query.user_id)
    console.log(doc_id, user_id)
    const result = await pool.query(
      "insert into public.Deletion_requests values (default, $1, $2);",
      [doc_id, user_id]
    );
    console.log(result.rows)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/get_all_users', async (req, res) => {
  try {
    const result = await pool.query(
      "select * from public.User"
    );
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/add_new_user', async (req, res) => {
  try {
    const first_name = req.query.first_name
    const second_name = req.query.second_name
    const third_name = req.query.third_name
    const email = req.query.email
    const password = hashSync(req.query.password, '$2b$10$wrmUUUhh9wBj4Zce8osQOO')
    const department = req.query.department
    const dep_result = await pool.query(
      "select * from public.Department where name = $1",
      [department]
    );
    const department_id = dep_result.rows[0].department_id
    console.log('department_id ', department_id)
    const result = await pool.query(
      "insert into public.User values (default, $1, $2, $3, $4, $5, $6);",
      [first_name, second_name, third_name, email, password, department_id]
    );
    console.log('succesful adding new user')
    res.json('succesful adding new user')
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/change_user_props', async (req, res) => {
  try {
    const user_id = parseInt(req.query.user_id)
    const first_name = req.query.first_name
    const second_name = req.query.second_name
    const email = req.query.email
    const password = req.query.password
    
    if(first_name!=''){
      const result = await pool.query(
        "update public.User set first_name = $1 where user_id = $2",
        [first_name, user_id]
      )
      console.log('first_name updated')
    }
    if(second_name!=''){
      const result = await pool.query(
        "update public.User set second_name = $1 where user_id = $2",
        [second_name, user_id]
      )
      console.log('second_name updated')
    }
    if(email!=''){
      const result = await pool.query(
        "update public.User set email = $1 where user_id = $2",
        [email, user_id]
      )
      console.log('email updated')
    }
    if(password!=''){
      const result = await pool.query(
        "update public.User set password = $1 where user_id = $2",
        [hashSync(req.query.password, '$2b$10$wrmUUUhh9wBj4Zce8osQOO'), user_id]
      )
      console.log('password updated')
    }


    console.log('succesful changing user')
    res.json('succesful changing user')
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/delete_by_doc_id', async (req, res) => {
  try {
    const doc_id = parseInt(req.query.doc_id)
    const result = await pool.query(
      "delete from public.Document where doc_id = $1",
      [doc_id]
    )

    console.log('succesful deletion by doc_id')
    res.json('succesful deletion')
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/get_all_docs', async (req, res) => {
  try {
    const result = await pool.query(
      "select * from public.Document order by doc_id"
    );
    console.log('get_all_docs')
    res.json(result.rows);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/get_all_del_requests', async (req, res) => {
  try {
    const result = await pool.query(
      "select dr.del_id, dr.doc_id, d.name, d.filename from public.Deletion_requests dr join public.Document d on dr.doc_id = d.doc_id order by dr.del_id"
    );
    console.log('get_all_del_requests')
    res.json(result.rows);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/delete_by_del_id', async (req, res) => {
  try {
    const del_id = parseInt(req.query.del_id)
    const del_id_result = await pool.query(
      "select * from public.Deletion_requests where del_id = $1",
      [del_id]
    )
    const doc_id = del_id_result.rows[0].doc_id
    const del_doc_result = await pool.query(
      "delete from public.Document where doc_id = $1",
      [doc_id]
    )
    const del_del_result = await pool.query(
      "delete from public.Deletion_requests where del_id = $1",
      [del_id]
    )

    console.log('succesful deletion by del_id')
    res.json('succesful deletion')
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cancel_deletion', async (req, res) => {
  try {
    const del_id = parseInt(req.query.del_id)
    const del_del_result = await pool.query(
      "delete from public.Deletion_requests where del_id = $1",
      [del_id]
    )

    console.log('succesful cancel by del_id')
    res.json('succesful deletion')
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/delete_by_user_id', async (req, res) => {
  try {
    const user_id = parseInt(req.query.user_id)
    const del_del_result = await pool.query(
      "delete from public.User where user_id = $1",
      [user_id]
    )

    console.log('succesful deletion by user_id')
    res.json('succesful deletion')
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/del_request_search', async (req, res) => {
  try {
    const search_req = req.query.search_req
    const result = await pool.query(
      "select del.del_id, d.doc_id, d.name, d.filename from public.Deletion_requests del join public.Document d on del.doc_id = d.doc_id where strpos(lower(d.name), $1) <> 0 order by del_id",
      [search_req]
    );
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/user_search', async (req, res) => {
  try {
    const search_req = req.query.search_req
    const result = await pool.query(
      "select * from public.User where strpos(lower(first_name), $1)<>0 or strpos(lower(second_name), $1)<>0 or strpos(lower(third_name), $1)<>0 order by user_id",
      [search_req]
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