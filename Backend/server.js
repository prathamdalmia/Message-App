const express = require("express");
const connectDB = require("./Config/db");
const colors = require("colors");

require("dotenv").config()

const app = express();
app.use(express.json());
connectDB()

app.get("/", (req, res) => {
  res.send("API is Running");
});
app.get("/api/chats", (req, res) => {
  res.status(200).json({ message: "This is Chat Api" })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is litening on port ${PORT}`.yellow.bold);
});
