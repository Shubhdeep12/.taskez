const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;
require("dotenv").config();

/*This method/middleware will check if there is any token 
  stored in request cookies as key pair of token:tokenValue

  if present then verify it with secret key,
  if the token is expired or is different then expected
  then it will throw error and return error status code.
*/
verifyToken = (req, res, next) => {
  // console.log(req.cookies);
  //console.log(req.body);
  var token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "No token provided!" });
  }
  try {
    const decodedData = jwt.verify(token, process.env.secret);
    req.body.userId = decodedData.id;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(400).send({ message: "Unauthorized!" });
  }
};

//to check if user is admin or not
isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

//to check if user is moderator or not.
isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
