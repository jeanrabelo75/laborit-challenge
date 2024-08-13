const express = require('express');
const queryRoutes = require('./routes/queryRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', queryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
