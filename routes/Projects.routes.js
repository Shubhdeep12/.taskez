const express = require("express");
const app = express();
const router = express.Router();
const controller = require("../controllers/note.controller");
require("dotenv").config();

//Project Screen getting all notes
router.route("/").get(async (req, res) => {
  controller.getAllNotes(req, res);
});

//get All users
router.route("/users").get(async (req, res) => {
  controller.getAllUsers(req, res);
});

//get a user
router.route("/user").get(async (req, res) => {
  controller.getUser(req, res);
});

//Adding Note
router.route("/add").post(async (req, res) => {
  controller.addNote(req, res);
});

//Delete Note
router.route("/delete").post(async (req, res) => {
  controller.deleteNote(req, res);
});

//Update Note
router.route("/update").put(async (req, res) => {
  controller.updateNote(req, res);
});

module.exports = router;
