const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, 'public');

const categoriesRouter = require('./routes/categoriesRouter');

app.use('/', express.static(assetsPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/', categoriesRouter);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log("Listening on port " + port);
})