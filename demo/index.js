const express = require('express')
const app = express();

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(41351, () => console.log('Example app listening on port 41351!'))