const router = require("express").Router();

const Users = require("./users-model.js");

//Added withDepartment function into GET request, can specify deparment to restrict access
router.get(
  "/",
  withDepartment("science, engineering"),
  (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  }
);
//middleware to check department
function withDepartment(department) {
  return function(req, res, next) {
    if (
      req.decodedJwt &&
      req.decodedJwt.department &&
      req.decodedJwt.department.includes(department)
    ) {
      next();
    } else {
      res.status(403).json({ message: "Restricted Access" });
    }
  };
}

module.exports = router;
