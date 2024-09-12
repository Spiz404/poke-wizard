import axios from 'axios'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import PokemonCard from './PokemonCard'
import CircularIndeterminate from './CircularIndeterminate'

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL

/*
    a total of 100 pokemon will be fetched
    40 pokemon will have the favoritePokemonType
    60 pokemon will have a random type
*/
const TeamSelectionComponent = ({favoritePokemonType}: {favoritePokemonType: string}) => {

    interface Pokemon {
        name: string
        url: string
    }
    const [isLoading, setIsLoading] = useState(true)
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    const [pokemonDetailsList, setPokemonDetailsList] = useState<any[]>([])

    useEffect(() => {

        const fetchData = async () => {
            console.log("fetching");
            // fetching favorite type pokemons
            try {

            const data = await axios.get(`${API_BASE_URL}/type/${favoritePokemonType}`)
            console.log(data.data.pokemon);
            const pokemonListWithSlot = data.data.pokemon.slice(0, 40)
            console.log(pokemonListWithSlot);
            const favPokemons = pokemonListWithSlot.map((e: {pokemon: Pokemon, slot: number}) => e.pokemon) 
            const favPokemonsNames = favPokemons.map((e: Pokemon) => e.name)
            const otherPokemons = await axios.get(`${API_BASE_URL}/pokemon?limit=100`)
            let filteredPokemons = otherPokemons.data.results.filter((e: Pokemon) => !favPokemonsNames.includes(e.name))
            filteredPokemons = filteredPokemons.slice(0, 60)

            const pokemons = [...favPokemons, ...filteredPokemons]

            const pokemonsDetails = await Promise.all(
                pokemons.map(async (pokemon) => {
                    const pokemonDetails = await axios.get(pokemon.url)
                    return pokemonDetails.data
                })
            );

            setPokemonDetailsList(pokemonsDetails)
            setPokemonList([...favPokemons, ...filteredPokemons])

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
        .catch(error => console.error(error))
    }, [])
    
    /*
    useEffect(() => {
        console.log("pokemonList", pokemonList)
    }, [pokemonList])
    */

    if (isLoading) {
        return <CircularIndeterminate />
    }

    return (
        <Grid container spacing={2} className="grid">
                {pokemonDetailsList.map((e) => {
                    return (
                        <Grid item key = {e.name}>
                                <PokemonCard key={e.name} pokemon={{name: e.name, image: e.sprites.front_default}}></PokemonCard>
                        </Grid>
                    )
                })}
        </Grid>
    );
}

export default TeamSelectionComponent