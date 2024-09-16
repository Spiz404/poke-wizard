import axios from 'axios'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import PokemonCard from './PokemonCard'
import CircularIndeterminate from '../CircularIndeterminate'
import SelectedPokemonCard from './SelectedPokemonCard'
import PokemonDialogComponent from './PokemonComponent'
import { PokemonAPIResponse, PokemonListAPIResponse } from '../types/pokemonAPI'
import { PokemonTypeAPIResponse } from '../types/pokemonTypeAPI'

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL

/*
    a total of 100 pokemon will be fetched
    40 pokemon will have the favoritePokemonType
    60 pokemon will have a random type
*/

interface Pokemon {
    name: string
    url: string
}

interface TeamSelectionComponentProps {
    favoritePokemonType: string,
    setSelectedPokemons: (pokemon: PokemonAPIResponse[]) => void,
    pokemonsList: PokemonAPIResponse[],
    selectedPokemons: PokemonAPIResponse[],
    setPokemonsList: (pokemon: PokemonAPIResponse[]) => void
}

const TeamSelectionComponent = ({favoritePokemonType, selectedPokemons, setSelectedPokemons, pokemonsList, setPokemonsList}: TeamSelectionComponentProps) => {

    const [isLoading, setIsLoading] = useState(true)
    //const [pokemonDetailsList, setPokemonDetailsList] = useState<PokemonAPIResponse[]>([])
    const [selectedPokemonList, setSelectedPokemonList] = useState<PokemonAPIResponse[]>([])
    const [showedPokemon, setShowedPokemon] = useState<PokemonAPIResponse | null>(null)
    const [openPokemonDialog, setOpenPokemonDialog] = useState(false)

    const selectPokemon = (pokemon: PokemonAPIResponse) => {

        if (selectedPokemonList.length < 7 && !selectedPokemonList.includes(pokemon)) {
            const updatedList = [...selectedPokemonList, pokemon]
            setSelectedPokemonList(updatedList)
            setSelectedPokemons(updatedList)
        }
    }

    

    // function that removes a pokemon from the selected list
    const removePokemon = (pokemonName: string) => {
        const updatedList = selectedPokemonList.filter((pokemon) => pokemon.name !== pokemonName);
        setSelectedPokemons(updatedList);
        setSelectedPokemonList(selectedPokemonList.filter((pokemon) => pokemon.name !== pokemonName))
    }
    
    /* 
        function to show the pokemon details dialog
        set the pokemon to show and opens the dialog
    */

    const showPokemonDialog = (pokemon: PokemonAPIResponse) => {
        setShowedPokemon(pokemon)
        setOpenPokemonDialog(true)
    }

    const closePokemonDialog = () => {
        setOpenPokemonDialog(false)
        setShowedPokemon(null)
    }

    useEffect(() => {
        console.log("use effect team selection");
        const fetchData = async () => {
            try {
                console.log("fetching pokemons");
                const pokemonsRequest = await axios.get<PokemonListAPIResponse>(`${API_BASE_URL}/pokemon?limit=1302`)
                const pokemons = pokemonsRequest.data.results;
                // fetching details for all selected pokemons
                const pokemonsDetails : PokemonAPIResponse[] = await Promise.all(
                    pokemons.map(async (pokemon) => {
                        const pokemonDetails = await axios.get<PokemonAPIResponse>(pokemon.url)
                        return pokemonDetails.data
                    })
                );

                //setPokemonDetailsList(pokemonsDetails)
                setPokemonsList(pokemonsDetails)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        setSelectedPokemonList(selectedPokemons)
        console.log("selected pokemons", selectedPokemons)
        if (pokemonsList.length == 0) fetchData().catch(error => console.error(error))
        else setIsLoading(false)
    }, [])
    
    // loading indicator while fetching data
    if (isLoading) {
        return <CircularIndeterminate />
    }

    return (
        <>
            {openPokemonDialog && <PokemonDialogComponent  selectPokemon={selectPokemon} onClose={closePokemonDialog} pokemon={showedPokemon} open={openPokemonDialog}/>}
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
                    {pokemonsList.map((e) => {
                        return (
                            <Grid item key = {e.name}>
                                    <PokemonCard selectedPokemonList={selectedPokemonList} showPokemon = {() => showPokemonDialog(e)} selectPokemon={selectPokemon} key={e.name} pokemon={e}></PokemonCard>
                            </Grid>
                        )
                    })}
            </Grid>
        </> 
    );
}

export default TeamSelectionComponent