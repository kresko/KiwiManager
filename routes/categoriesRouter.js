const { Router } = require("express");
const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");

categoriesRouter.get("/", categoriesController.redirectToCategories);
categoriesRouter.get("/categories", categoriesController.getAllCategories);
categoriesRouter.get('/categories/:id', categoriesController.getCategoryByCategoryKey);

module.exports = categoriesRouter;