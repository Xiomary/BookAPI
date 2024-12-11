const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./db');
const userRoute = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const SERVER_PORT = 8081;

dbConnection();

const corsOrigin = {
  origin: 'http://localhost:3000', 
  credentials: true,            
  optionSuccessStatus: 200
};

app.use(cors(corsOrigin));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoute);

app.listen(SERVER_PORT, () => {
  console.log(`The backend service is running on port ${SERVER_PORT}`);
});
