const express = require("express");
const { validateBody, validateProjectID } = require("./middleware");

const Task = require("./model");
//hook up middleware
const router = express.Router();

//endpoints
//post
router.get("/", (req, res) => {
  Task.findAll().then((resp) => {
    res.status(200).json(resp);
  });
});

router.post("/", validateBody, (req, res) => {
  Task.postTask(req.body)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
