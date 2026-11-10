const express = require('express');
const { Pool } = require('pg');

// Konfiguration aus der Umgebung (compose.yaml / Coolify), nicht aus dem Code
const pool = new Pool({
  host: process.env.DB_HOST, database: process.env.DB_NAME,
  user: process.env.DB_USER, password: process.env.DB_PASS,
});
const app = express();

app.get('/health', (req, res) => res.send('ok'));

app.get('/', async (req, res) => {
  await pool.query('CREATE TABLE IF NOT EXISTS besuche (id serial PRIMARY KEY, zeit timestamptz DEFAULT now())');
  await pool.query('INSERT INTO besuche DEFAULT VALUES');
  const { rows } = await pool.query('SELECT count(*) AS n FROM besuche');
  res.send(`Besuche: ${rows[0].n}`);   // Zahl aus der DB, kein Nutzer-HTML
});

const server = app.listen(3000, '0.0.0.0');
process.on('SIGTERM', () => server.close(() => pool.end()));   // sauberes Beenden bei docker stop
