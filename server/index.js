const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { serverConfig } = require('./config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use("/api", routes);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(serverConfig.PORT, () => {
    console.log("server started at port: " + serverConfig.PORT);
})