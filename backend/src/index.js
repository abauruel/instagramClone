const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const cors = require("cors");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors());
app.use(routes);
mongoose.connect(
  "mongodb+srv://week7:week7@sandbox-ue8p9.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

server.listen(3333);
