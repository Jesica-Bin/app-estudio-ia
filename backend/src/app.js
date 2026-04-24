const express = require('express');
const userRoutes = require('./routes/userRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/subjects', subjectRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;
