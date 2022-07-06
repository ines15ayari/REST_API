const mongoose = require("mongoose")
const URI = "mongodb+srv://ines15ayari:sez71PYZ1SIvOrL9@cluster0.7lo7hyf.mongodb.net/?retryWrites=true&w=majority";
const connect = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected Successfully to the Database");
  } catch {
    console.log("Failed to connect to the Database!")
  }
}
module.exports = connect
