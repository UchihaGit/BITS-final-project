require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
const commentRoutes = require("./routes/comment");

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => console.log("DB GOT OOPS"));

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", questionRoutes);
app.use("/api", commentRoutes);

//ports
const port = 8000;

server.listen(port, () => {
  console.log("app is launched");
});

io.on("connection", (socket) => {
  socket.on("send-message", (message) => {
    console.log("send message ", message);
    // socket.broadcast.emit("receive-message", message);
    io.emit("receive-message", message);
  });
});
