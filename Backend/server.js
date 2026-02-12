const express = require("express");
const connectDB = require("./Config/db");
const colors = require("colors");
const userRouter = require('./Routes/user.routes');
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
require("dotenv").config()

const app = express();
app.use(express.json());
connectDB()

app.get("/", (req, res) => {
  res.send("API is Running");
});
app.use("/api/user", userRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is litening on port ${PORT}`.yellow.bold);
});
