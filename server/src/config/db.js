
const mongoose = require("mongoose");

const ConnectDB = () => {
    return mongoose.connect("mongodb+srv://rahulr41180:Rahul12345@cluster0.i4t9k.mongodb.net/chatterApp?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB has connected successfully"))
    .catch((error) => console.log({"error in MongoDB connection" : error.message}))
}

module.exports = ConnectDB;