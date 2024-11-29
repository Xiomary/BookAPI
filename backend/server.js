const express = require("express");
const app = express();
const cors = require('cors')
const dbConnection = require('./db');
const bookRoute = require('./routes/book');
const userRoute = require('./routes/userRoutes');
const { application } = require("express");

require('dotenv').config();
const SERVER_PORT = 8081
 
dbConnection()
app.use(cors({origin: '*'}))

// middleware
// tells express to parse json data in the upcoming requests 
app.use(express.json())

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})

app.use('/api/books', bookRoute); 
app.use('/api/users', userRoute);

