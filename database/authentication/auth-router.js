const router = require("express").Router();
const bcrypt = require("bcryptjs");
//JSON web token
const jwt = require('jsonwebtoken');

//imported secret, using currying
const secret = require('../authentication/secrets').jwtSecret;
const Users = require("../users/users-model.js");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        //create token during check with payload(parameter)
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          //send token back
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//CREAT TOKEN function with the payload (user)<--- parameter
function generateToken(user) {
const payload = {
  subject: user.id,
  username: user.username,
  department: ['science, engineering']
};
//import secret
// const secret = 'sword of destiny';
const options = {
  expiresIn: '1d'
};
 //sign the token to be ready for secure transit, fufill parameters.
 return jwt.sign(payload, secret, options);  
};

module.exports = router;
