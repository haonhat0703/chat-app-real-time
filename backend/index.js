//{}[]
require("dotenv").config(); //.env
const express = require("express");
const app = express();
const socket = require("socket.io");

//router
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
//

const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//connect to database (mongoDB)
const connectDB = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@chat-app.loevcmo.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB(); //end connect

//route
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
//

const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log(`Server is running at port ${PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket
        .to(sendUserSocket)
        .emit("msg-recieve", { message: data.message, from: data.from });
    }
  });
});
