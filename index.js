const express = require('express');
const app = express();

app.get('/', (request, response) => {
  response.send({ hello: 'world' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);