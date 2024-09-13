import axios from 'axios'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import PokemonCard from './PokemonCard'
import CircularIndeterminate from './CircularIndeterminate'
import SelectedPokemonCard from './SelectedPokemonCard'
import PokemonComponent from './PokemonComponent'

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
    const [selectedPokemonList, setSelectedPokemonList] = useState<any[]>([])
    const [showedPokemon, setShowedPokemon] = useState<any>(null)
    const [openPokemonDialog, setOpenPokemonDialog] = useState(false)

    const selectPokemon = (pokemon: any) => {

        if (selectedPokemonList.length < 7 && !selectedPokemonList.includes(pokemon)) {
            setSelectedPokemonList([...selectedPokemonList, pokemon])
        }
    }

    

    // function that removes a pokemon from the selected list
    const removePokemon = (pokemonName: string) => {
        setSelectedPokemonList(selectedPokemonList.filter((pokemon) => pokemon.name !== pokemonName))
    }
    
    /* 
        function to show the pokemon details dialog
        set the pokemon to show and opens the dialog
    */

    const showPokemonDialog = (pokemon: any) => {
        setShowedPokemon(pokemon)
        setOpenPokemonDialog(true)
    }

    const closePokemonDialog = () => {
        setOpenPokemonDialog(false)
        setShowedPokemon(null)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                // fetching favorite type pokemons
                const data = await axios.get(`${API_BASE_URL}/type/${favoritePokemonType}`)
                const pokemonListWithSlot = data.data.pokemon.slice(0, 40)

                const favPokemons = pokemonListWithSlot.map((e: {pokemon: Pokemon, slot: number}) => e.pokemon) 
                const favPokemonsNames = favPokemons.map((e: Pokemon) => e.name)
                
                // fetching other pokemons
                const otherPokemons = await axios.get(`${API_BASE_URL}/pokemon?limit=100`)
                // filtering to avoid duplicates
                let filteredPokemons = otherPokemons.data.results.filter((e: Pokemon) => !favPokemonsNames.includes(e.name))
                filteredPokemons = filteredPokemons.slice(0, 60)

                const pokemons = [...favPokemons, ...filteredPokemons]

                // fetching details for all selected pokemons
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
    
    // loading indicator while fetching data
    if (isLoading) {
        return <CircularIndeterminate />
    }

    return (
        <>
            {openPokemonDialog && <PokemonComponent  selectPokemon={selectPokemon} onClose={closePokemonDialog} pokemon={showedPokemon} open={openPokemonDialog}></PokemonComponent>}
            <Grid container spacing = {2} className="selected-team-grid">
                { selectedPokemonList.length == 0 && <p className="no-pokemon-selected">No pokemons selected, select your team!</p> }
                { selectedPokemonList.map((e) => {
                    return (
                        <Grid item key={e.name}>
                            <SelectedPokemonCard key={e.name} pokemon={e} removePokemon={removePokemon}></SelectedPokemonCard>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid container spacing={2} className="grid">
                    {pokemonDetailsList.map((e) => {
                        return (
                            <Grid item key = {e.name}>
                                    <PokemonCard selectedPokemonList={selectedPokemonList} showPokemon = {() => showPokemonDialog(e)} selectPokemon={selectPokemon} key={e.name} pokemon={{name: e.name, image: e.sprites.front_default}}></PokemonCard>
                            </Grid>
                        )
                    })}
            </Grid>
        </> 
    );
}

export default TeamSelectionComponent