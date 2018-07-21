const express = require('express');
const app = express();

const PORT = process.env.PORT || 9000;

require('./routes')(app);

app.listen(PORT, () => {
    console.log(`groupify running on port ${PORT}`);
});
