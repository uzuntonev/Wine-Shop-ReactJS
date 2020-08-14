const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { secret, port } = require('./config');
const app = express();

const root = require('path').join(__dirname,'..', '/client/build');

app.use(express.static(root));

app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser(secret));
app.use(express.json());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Server error!');
});

require('./routes')(app);


app.listen(port, () => {
  console.log(`Server: Listening on port ${port}`);
});
