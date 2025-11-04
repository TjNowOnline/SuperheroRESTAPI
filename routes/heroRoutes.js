const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");
const { validateHero } = require("../validators/favoriteValidator");

router.get("/superheroes", heroController.getAllHeroes);
router.get("/superheroes/:id", heroController.getHeroById);

router.post("/favorite", validateHero, heroController.addFavorite);
router.delete("/favorite/:id", heroController.deleteFavorite);
router.get("/favorites", heroController.getFavorites);

module.exports = router;