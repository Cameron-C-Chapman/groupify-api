const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;

require('./routes')(app);

app.listen(PORT, () => {
    console.log(`groupify running on port ${PORT}`);
});
