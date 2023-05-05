require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const channelRoutes = require('./routes/channelRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error));


app.use(cors());
app.use(bodyParser.json());
app.use('/api', channelRoutes);
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server running on port ${port}`));