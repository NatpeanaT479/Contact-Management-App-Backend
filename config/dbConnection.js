const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require("mongoose");

//To establish connection with Mongodb using mongoose with a connection string stored in .env
async function connect(){
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
        "Database connected: ",
        connect.connection.host,
        connect.connection.name
    )
};

//*Important*. Call upon connection function to establish connection with Mongodb.  
connect()

module.exports = { connect };
