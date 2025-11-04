const axios = require('axios');

const EXTERNAL_URL = "https://akabab.github.io/superhero-api/api/all.json";

let favorites = [];

let cache = {
    data: null,
    ts: 0
};
const CACHE_TTL = 60 * 1000;

async function fetchExternalAll() {
    const now = Date.now();
    if (cache.data && (now - cache.ts) < CACHE_TTL) {
        return cache.data;
    }
    const resp = await axios.get(EXTERNAL_URL);
    cache = { data: resp.data, ts: now };
    return resp.data;
}

function mapHeroToPublic(h) {
    return {
        id: h.id,
        name: h.name,
        fullName: h.biography && h.biography.fullName ? h.biography.fullName : "",
        strength: h.powerstats && h.powerstats.strength !== undefined ? h.powerstats.strength : null,
        image: h.images && h.images.md ? h.images.md : ""
    };
}

async function fetchAllMapped() {
    const all = await fetchExternalAll();
    return all.map(mapHeroToPublic);
}

async function fetchByIdMapped(id){
    const data = await fetchExternalAll();
    const found = data.find(h => Number(h.id) === Number(id));
    return found ? mapHeroToPublic(found) : null;
}

function addFavorite({id, note}) {
    const existing = favorites.find(f => f.id === id);
    if (existing) {
        existing.note = note;
        return existing;
    }
    const fav = {id, note};
    favorites.push(fav);
    return fav;
}

function getFavorites() {
    return favorites;
}

function deleteFavorite(id) {
    const idx = favorites.findIndex(f => Number(f.id) === Number(id));
    if (idx >= 0) {
        favorites.splice(idx, 1);
        return true;
    }
}

module.exports = {
    fetchAllMapped,
    fetchByIdMapped,
    addFavorite,
    getFavorites,
    deleteFavorite
};