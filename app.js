const express = require('express');
const heroRoutes = require('./routes/heroRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/', heroRoutes);

app.use(errorHandler);

// app.js (nederst)
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server kører på port ${PORT}`));
}

module.exports = app;
