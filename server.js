const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Projects = require("./routes/Projects.routes");
const Login = require("./routes/Login.routes");
const db = require("./models");
const Role = db.role;
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const { logout, authJwt } = require("./middlewares");
const cookieParser = require("cookie-parser");

//middleware

//using cors for allowing the origin(frontend url) to send requests.
//app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

//to use cookies
app.use(cookieParser());

//to convert request in json format.
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Setting up port
const port = process.env.PORT || 4000;

//Setting up database connection
const uri = process.env.ATLAS_URI;
try {
  db.mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Mongo db connected successfully");
  initial();
} catch (err) {}

//initial function to set up different types of roles in database.
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb database connection established successfully");
});

//Routes
app.use("/Login", Login);
app.use("/Projects", Projects);

//get request to logout (clear out the cookie)
app.route("/logout").get((req, res) => {
  //console.log("logging out");
  logout.logoutUser(req, res);
});

//get request to check if token given is still valid or not.
app.route("/status").get([authJwt.verifyToken], (req, res) => {
  res.status(200).send({ message: "token verified" });
});

//starting server on given port.
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
