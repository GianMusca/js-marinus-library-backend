require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./src/config/db.mysql');
const userRouter = require('./src/routes/users.routes');
const bookRouter = require('./src/routes/books.routes');

const app = express();

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.get('/ping-mysql', async (req, res) => {
  try {
    const result = await pool.query('SELECT now()');
    res.status(200).json({
      status: 'success',
      message: 'Pong!',
      data: result[0],
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al ejecutar la consulta',
      error: error.message,
    });
  }
});