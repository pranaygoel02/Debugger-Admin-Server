const express = require('express');
const dotenv = require('dotenv');
const connection = require('./database/dbConnect');
const app = express();
const cors = require('cors');
dotenv.config()
const port = process.env.PORT || 8000;

const questionRouter = require('./routes/questionRoute');
const roundRouter = require('./routes/roundRoute');

app.use(express.json({limit: '50mb'}));
app.use(cors())

connection().then(
    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })
);

app.get('/', (req, res) => {
    res.status(200).json({port: port, msg:'Hello World!'})
});

//////// Routes //////////////
app.use('/question', questionRouter);
app.use('/round', roundRouter);