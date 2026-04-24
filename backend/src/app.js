const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;
