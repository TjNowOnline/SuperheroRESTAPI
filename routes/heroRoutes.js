const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");
const { validateHero } = require("../middlewares/validateHero");

router.get("/superheroes", heroController.getAllHeroes);
router.get("/superheroes/:id", heroController.getHeroById);

router.post("/favorite", validateHero, heroController.addFavoriteHero);
router.delete("/favorite/:id", heroController.removeFavoriteHero);
router.get("/favorites", heroController.getFavoriteHeroes);

module.exports = router;