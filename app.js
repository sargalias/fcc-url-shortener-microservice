const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/api', (req, res) => {
    res.send('API home');
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});