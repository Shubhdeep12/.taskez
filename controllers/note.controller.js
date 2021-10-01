const db = require("../models");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
var _ = require("underscore");

app.use(cors());

//get request to get all notes of every type present in database.
exports.getAllNotes = async (req, res) => {
  try {
    const allNotes = await db.note.find().sort({ createdAt: -1 });

    res.status(200).send(allNotes);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.user.find();

    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    db.user
      .findOne({
        _id: mongoose.Types.ObjectId(
          jwt.verify(req.cookies.token, process.env.secret).id
        ),
      })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.status(200).send(user.name);
      });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.addNote = async (req, res) => {
  try {
    const userFind = await db.user.findById(
      mongoose.Types.ObjectId(req.body.userId)
    );

    const userObj = new db.note({
      heading: "Give your task a title",
      data: "Description..",
      type: req.body.type,
      user: { name: userFind.name, img: null },
      comments: [],
      userRef: mongoose.Types.ObjectId(req.body.userId),
    });

    userObj.save();
    db.user.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.body.userId),
      { $push: { Notes: userObj._id } },
      { safe: true, upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "Note Added" });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    db.note.findByIdAndDelete(
      mongoose.Types.ObjectId(req.body.noteId),
      (err, ok) => {
        if (err) {
          console.log(err);
          return;
        }

        db.user.findByIdAndUpdate(
          mongoose.Types.ObjectId(req.body.userId),
          {
            $pull: { Notes: mongoose.Types.ObjectId(req.body.noteId) },
          },
          { safe: true, upsert: true },
          (err, ok) => {
            if (err) {
              console.log(err);
            }

            res.status(200).send({ message: "note deleted" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

exports.updateNote = async (req, res) => {
  try {
    await db.note.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.noteId), {
      heading: req.body.heading,
      data: req.body.data,
      type: req.body.type,
    });

    res.status(200).send({ message: "note updated" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
