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
                    message: `Hero with id ${id} not found.`
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

        // valider at note findes (alternativt brug Joi middleware)
        if (!note) {
            return res.status(400).json({ error: 'Note mangler' });
        }

        const fav = heroModel.addFavorite({ id, note });

        // returnér både message og favoritobjekt
        return res.status(201).json({
            message: 'Favorit tilføjet!',
            favorite: fav
        });

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
