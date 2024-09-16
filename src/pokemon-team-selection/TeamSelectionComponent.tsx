import axios from 'axios'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import PokemonCard from './PokemonCard'
import CircularIndeterminate from '../CircularIndeterminate'
import SelectedPokemonCard from './SelectedPokemonCard'
import PokemonDialogComponent from './PokemonComponent'
import { PokemonAPIResponse, PokemonListAPIResponse } from '../types/pokemonAPI'
import { Result } from '../types/pokemonAPI'
import { PokemonTypeAPIResponse, Pokemon, Generation } from '../types/pokemonTypeAPI'

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL

/*
    a total of 100 pokemon will be fetched
    40 pokemon will have the favoritePokemonType
    60 pokemon will have a random type
*/



interface TeamSelectionComponentProps {
    favoritePokemonType: string,
    setSelectedPokemons: (pokemon: PokemonAPIResponse[]) => void,
    pokemonsList: PokemonAPIResponse[],
    selectedPokemons: PokemonAPIResponse[],
    setPokemonsList: (pokemon: PokemonAPIResponse[]) => void,
    currentFavoritePokemonType: string,
    setCurrentFavoritePokemonType: (pokemonType: string) => void
}

const TeamSelectionComponent = ({favoritePokemonType, selectedPokemons, setSelectedPokemons, pokemonsList, setPokemonsList, currentFavoritePokemonType, setCurrentFavoritePokemonType}: TeamSelectionComponentProps) => {

    const [isLoading, setIsLoading] = useState(true)
    const [selectedPokemonList, setSelectedPokemonList] = useState<PokemonAPIResponse[]>([])
    const [showedPokemon, setShowedPokemon] = useState<PokemonAPIResponse | null>(null)
    const [openPokemonDialog, setOpenPokemonDialog] = useState(false)
    const [pokemons, setPokemons] = useState<Result[]>([])
    const [localPokemonsList, setLocalPokemonsList] = useState<PokemonAPIResponse[]>([])
    const [page, setPage] = useState(1)

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

    // function that fetches details of pokemons in the current page 
    const fetchPokemonsPage = async (page: number, pokemons: Result[]) => {

        const pokemonsToFetch = pokemons.slice((page - 1) * 20, page  * 20)
        console.log("pokemons", pokemons);
        console.log("pokemons to fetch", pokemonsToFetch)
        const pokemonsDetails : PokemonAPIResponse[] = await Promise.all(
            pokemonsToFetch.map(async (pokemon) => {
                const pokemonDetails = await axios.get<PokemonAPIResponse>(pokemon.url)
                return pokemonDetails.data
            })
        );

        setLocalPokemonsList(pokemonsDetails)
    }

    const updatePage = (page : number) => {
        setPage(page);
        fetchPokemonsPage(page, pokemons);
    }

    useEffect(() => {

        const fetchData = async () => {
            try {

                // fetching all pokemons of the favorite type
                const res = await axios.get<PokemonTypeAPIResponse>(`${API_BASE_URL}/type/${favoritePokemonType}`)
                const data = res.data.pokemon

                const favPokemons = data.map(pokemon => pokemon.pokemon)

                // fetching all pokemons WITHOUT DETAILS
                const allData = await axios.get<PokemonListAPIResponse>(`${API_BASE_URL}/pokemon?limit=1302`)
                const allPokemons = allData.data.results;

                // removing fav pokemons from all pokemons
                const nonFavPokemons = allPokemons.filter(pokemon => !favPokemons.some(fav => fav.name === pokemon.name))

                // composing sorted final list
                const finalPokemonsList = [...favPokemons, ...nonFavPokemons]

                setPokemons(finalPokemonsList)

                // fetching details for pokemons in page 0 (first page when component is mounted)
                fetchPokemonsPage(1, finalPokemonsList)

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        setSelectedPokemonList(selectedPokemons)
        console.log("selected pokemons", selectedPokemons)
        if (pokemonsList.length == 0 || currentFavoritePokemonType != favoritePokemonType) fetchData().catch(error => console.error(error))
        else setIsLoading(false)

        setCurrentFavoritePokemonType(favoritePokemonType)
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
                    {localPokemonsList.map((e) => {
                        return (
                            <Grid item key = {e.name}>
                                    <PokemonCard selectedPokemonList={selectedPokemonList} showPokemon = {() => showPokemonDialog(e)} selectPokemon={selectPokemon} key={e.name} pokemon={e}></PokemonCard>
                            </Grid>
                        )
                    })}
            </Grid>
            <div style={{display: "flex", flexDirection : "row", justifyContent: "center"}}>
                <Pagination count={Math.floor(pokemons.length / 20)} page={page} onChange={(_e, page) => updatePage(page)} />
            </div>
        </>
    );
}

export default TeamSelectionComponent