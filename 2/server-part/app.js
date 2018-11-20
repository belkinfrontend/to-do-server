const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const columnsRouter = require('./routes/columns');

const cors = require('cors');

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, 'client');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/columns', columnsRouter);
app.use(express.static(clientPath));

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`)
});

