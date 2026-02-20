const express = require("express");
const connectDB = require("./Config/db");
const colors = require("colors");
const userRouter = require('./Routes/user.routes');
const chatRouter = require("./Routes/chat.routes");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
require("dotenv").config()

const app = express();
app.use(express.json());
connectDB()




app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is litening on port ${PORT}`.yellow.bold);
});
