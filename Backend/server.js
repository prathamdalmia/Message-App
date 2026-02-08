const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running");
});
app.get("/api/chats", (req, res) => {
  res.status(200).json({ message: "This is Chat Api" })
})

app.listen(5000, () => {
  console.log("server is litening on port 5000");
});
