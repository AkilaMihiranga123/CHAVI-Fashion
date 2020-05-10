const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
//assign port number
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//import routes
const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');

//use imported routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


//Connect DB
mongoose.connect(process.env.MongoDB_CONNECTION,{ useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('MongoDB database connection established successfully.!')
);

//Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});