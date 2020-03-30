'use strict';

const app = require('./express/server');

app.listen(5003, () => console.log('Local app listening on port 5003!'));