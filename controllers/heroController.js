const heroModel = require('../models/heroModel');

exports.getAllHeroes = async (req, res, next) => {
    try {
        const heroes = await heroModel.fetchAllMapped();
        res.json(heroes);
    } catch (err){
        next(err);
    }
};

exports.getHeroById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const hero = await heroModel.fetchByIdMapped(id);
        if (!hero) {
            return res.status(404).json({
                error: {
                    message: 'Hero with id ${id} not found.'
                }
            });
        }
        res.json(hero);
    } catch (err){
        next(err);
    }
}

exports.addFavorite = (req, res, next) => {
    try {
        const { id, note } = req.body;
        // model will handle duplicates if you want
        const fav = heroModel.addFavorite({ id, note });
        res.status(201).json(fav);
    } catch (err) {
        next(err);
    }
};

exports.getFavorites = (req, res, next) => {
    try {
        const favs = heroModel.getFavorites();
        res.json(favs);
    } catch (err) {
        next(err);
    }
};

exports.deleteFavorite = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const deleted = heroModel.deleteFavorite(id);
        if (!deleted) {
            return res.status(404).json({ error: `Favorite with id ${id} not found` });
        }
        res.json({ message: `Favorite with id ${id} deleted` });
    } catch (err) {
        next(err);
    }
};