var express = require("express");
var router = express.Router();
var path = require("path");

var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database(path.join(__dirname, "../../sqlite/test.db"));

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  db.all("SELECT * FROM `goods`", [], (err, rows) => {
    if (err == null) {
      console.log("ok");
      res.send(rows);
    } else {
      console.log("err3");
      res.send(err);
    }
  });
});

module.exports = router;
