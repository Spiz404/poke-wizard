import {PokemonAPIResponse} from "../types/pokemonAPI"

export const getPokemonImage = (pokemon : PokemonAPIResponse): string => {

    if (!pokemon) return "../../public/question_mark.png"

    return pokemon.sprites.front_default || pokemon.sprites.back_default || pokemon.sprites.front_female
        || pokemon.sprites.front_shiny || pokemon.sprites.other?.home.front_default
        || "../../public/question_mark.png"

}

