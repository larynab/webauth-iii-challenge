const bcrypt = require("bcryptjs");
//JSON web token
const jwt = require("jsonwebtoken");
//import secret
const secrets = require("./secrets");

const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
  //username-password not needed anymore, because of token
  // const { username, password } = req.headers;
  const token = req.headers.authorization;
  if (token) {
    //VERIFY token with error callback
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        //token not valid
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        //token valid
        //req.decodedJwt = decodedToken;

        next();
      }
    });
  } else {
    res.status(401).json({ message: "access denied" });
  }
  //token takes over
  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: "Invalid Credentials" });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: "Ran into an unexpected error" });
  //     });
  // } else {
  //   res.status(400).json({ message: "No credentials provided" });
  // }
};
