const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//to check if username or email is duplicate or not while signing up.
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username

  // User.findOne({
  //   name: req.body.name,
  // }).exec((err, user) => {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  //   if (user) {
  //     res.status(400).send({ message: "Failed! Username is already in use!" });
  //     return;
  //   }

  // Email
  //console.log(req.body);
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  });
  // });
};

//to check if any other role is given while signup.
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
