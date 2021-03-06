//express 
const express = require('express');
//security
const helmet = require('helmet');
//cross-origin resource sharing
const cors = require('cors');
//routers
const authRouter = require('./database/authentication/auth-router.js');
const usersRouter = require('./database/users/users-router.js');
const restricted = require('./database/authentication/restricted-middleware.js');
//server use express
const server = express();
//middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
//routing
server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);
//CRUD server
server.get('/', (req, res) => {
  res.send("Root ready to service!");
});
//export server
module.exports = server;