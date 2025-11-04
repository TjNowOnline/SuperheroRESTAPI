const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");
const { validateFavorite } = require("../validators/favoriteValidator");

router.get("/superheroes", heroController.getAllHeroes);
router.get("/superheroes/:id", heroController.getHeroById);

router.post("/favorites", validateFavorite, heroController.addFavorite);
router.delete("/favorites/:id", heroController.deleteFavorite);
router.get("/favorites", heroController.getFavorites);

module.exports = router;
