const express = require('express')
const connectdb = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
require('dotenv').config();
connectdb();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use('/', require('./routes/noteRoutes'));

app.listen(5000, () => {
  console.log('serving on port 5000....');
})


