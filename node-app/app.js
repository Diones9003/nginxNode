const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL Database!');
  // Criação da tabela people, se ainda não existir
  db.query(`CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )`, (err) => {
    if (err) {
      throw err;
    }
    console.log('Table created successfully!');
  });
});

app.get('/', (req, res) => {
  db.query('SELECT * FROM people', (err, results) => {
    if (err) {
      throw err;
    }
    let names = results.map(result => result.name).join(', ');
    res.send(`<h1>Full Cycle Rocks!</h1>\n\n<p>Lista de nomes cadastrados: ${names}</p>`);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});