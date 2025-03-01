const express = require('express');
const data = require('./data.js');
const http = require('http');
const cors=require('cors');
const app = express();
const PORT = 4000;
console.log('Loaded Data:', data);
app.use(cors());
app.get('/', (req, res) => {
    res.json(data);
});

app.get('/api/people', (req, res) => {
    res.json(data);
});

const myserver = http.createServer(app);
myserver.listen(PORT, () => {
    console.log('Server is running on Port: 4000');
});
