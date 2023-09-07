//서버를 띄우기 위해 필요한 것
const express = require('express');
const app = express();

let PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});