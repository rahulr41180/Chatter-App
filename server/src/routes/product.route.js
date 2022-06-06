
const express = require("express");

const router = express.Router();
const { getAllProduct, addProduct } = require("../controllers/product.controller");

router.get("", getAllProduct);
router.post("", addProduct);

module.exports = router;