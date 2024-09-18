
const mockPokemons = require('./components/mockPokemons.json');
import { PokemonAPIResponse } from '../src/types/pokemonAPI';
const axios = require('axios');
const fs = require('fs');
const mockPokemonDetails = 
Promise.all(
    mockPokemons.results.map(async (pokemon) => {
        
        const pokemonDetails = await axios.get(pokemon.url);
        const jsondata = pokemonDetails.data; 

        return {
            url : pokemon.url,
            name: jsondata.name,
            species: {
                url:  jsondata.species.url
            }
        }
    })
)

mockPokemonDetails.then((pokemons) => {
    let items = {};
    for (let item of pokemons) {
        items[item.url] = {
            name: item.name,
            species: {
                url:  item.species.url
            }
        }
    }
    fs.writeFileSync('./mockPokemonDetails.json', JSON.stringify(items, null, 2));
});