const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5050;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Wordllban application." });
})

const itemRoutes = require("./src/routes/item.routes");

//** додайте наступний рядок тільки після створення маршрутів **
app.use('your middleware route', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${port}.`);
});
