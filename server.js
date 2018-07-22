const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;

require('./routes')(app);

models.sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`groupify running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('error syncing models: ', error);
    });
