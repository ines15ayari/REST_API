const express = require('express');
const app = express()

const router = express.Router();
const User = require('./Models/User')

//middleware global
app.use(express.json());

const connect = require("./config/connectDB");
const { findByIdAndRemove } = require('./Models/User');
require("dotenv").config({ path: "./config/.env" });

const port = 6000 || process.env.PORT;
app.listen(port, (error) => {
  if (error) {
    console.log("server failed");
  } else {
    console.log(`server is running on port ${port} `);
  }
});
//connect db
connect();

//Defining the routes
//GET Route
app.get("/", async (req, res) => {
  const users = await User.find()
  try {
    if (users.length == 0) {
      res.status(401).json({ msg: 'database is empty' });
    }
    else {
      res.status(200).json({ users });
    }

  } catch {
    res.status(400).json({ msg: "failed to get all users" });
  }
});

//POST Route
app.post("/", async (req, res) => {
  const user = req.body
  const searchedUser = await User.findOne({ email: user.email });


  try {
    if (searchedUser) {
      res.status(401).json({ msg: "user already exist" });
    } else {
      const newUser = new User({
        userName: user.userName,
        email: user.email,
        age: user.age,
      });
      await newUser.save();
      res.status(200).json({ msg: "user sucessfully added", user: newUserx });
    }
  } catch {
    res.status(400).json({ msg: "saving failed" });
  }
});

//PUT Route
app.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = req.body;
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    const users = await User.find()
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ msg: 'error' });
  }
});

//DELETE Route
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try{
  await User.findByIdAndRemove(id, (err,docs)=>{
    if(err){
      console.log("There is an Error while deleting");
    }else{
      console.log(docs)
    }
  })
  const users = await User.find()
  res.status(200).json({ msg: "User sucessfully deleted" },{users});
  } catch(error) {
    res.status(400).json({ msg: "Error" });
  }
});

module.exports = router;