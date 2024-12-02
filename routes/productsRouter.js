const { Router } = require("express");
const productsRouter = Router();
const productsController = require("../controllers/productsController");

productsRouter.get('/categories/delete-product/:id', productsController.deleteProduct);

module.exports = productsRouter;