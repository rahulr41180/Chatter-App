
const express = require("express");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
const ConnectDB = require("./src/config/db");

const productController = require("./src/routes/product.route");


app.use("/product", productController);


app.listen(PORT, async () => {
    try {
        await ConnectDB();
        console.log(`listening on port ${PORT}`);
    }
    catch(error) {
        console.log({"error in listening on port" : error.message});
    }
})

module.exports = app;