const express = require('express');
const app = express();

const PORT = 9000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`groupify running on port ${PORT}`);
});
