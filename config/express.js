const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { secret, port } = require('./config');
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.static(path.resolve( 'client/public')));
app.use(cookieParser(secret));
app.use(express.json());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Server error!');
});

app.get('*', (req, res) => {
  res.sendFile(
    path.join(path.resolve( 'client/public'), 'index.html')
  );
});
require('./routes')(app);

app.listen(port, () => {
  console.log(`Server: Listening on port ${port}`);
});
