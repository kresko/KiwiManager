const { Router } = require("express");
const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");

categoriesRouter.get("/", categoriesController.redirectToCategories);
categoriesRouter.get("/categories", categoriesController.getAllCategories);

module.exports = categoriesRouter;