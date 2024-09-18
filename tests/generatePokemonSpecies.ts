
const mockPokemons = require('./components/mockPokemons.json');
import { PokemonAPIResponse } from '../src/types/pokemonAPI';
const axios = require('axios');
const fs = require('fs');
const pokemonDetails = require('./mockPokemonDetails.json');
const species :string[] = [];
console.log("ciao");
for (let item of Object.entries(pokemonDetails)) {
    species.push(item[1].species.url);
}
console.log(species);
let res : {[key: string]: {generation: {name : string}}} = {};

let speciesObjects =  Promise.all(species.map(async (species) => {
    return axios.get(species)
    .then(res => res.data);
}))

speciesObjects.then((spec) => {
    let res = {};
    let i = 0;
    for (let item of spec) {
        res[species[i]] = {
            generation: {
                name: item.generation.name
            }
        }
        i++;
    }

    fs.writeFileSync('./mockPokemonSpecies.json', JSON.stringify(res, null, 2));
})
