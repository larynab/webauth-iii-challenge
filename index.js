//server start
const server = require('./server.js');
//server port
const port = process.env.PORT || 6300;
server.listen(port, () => console.log(`\n** Server online on port ${port} **\n`));