import { Dialog , DialogContent, Button, Chip } from '@mui/material'
import { PokemonAPIResponse } from '../types/pokemonAPI'
import {Type, Species, Move } from '../types/pokemonAPI'
import { getPokemonImage } from '../utils/getPokemonImage'
const PokemonDialogComponent = ({pokemon, open, onClose, selectPokemon}: {pokemon: PokemonAPIResponse | null, open: boolean, onClose: () => void, selectPokemon: (pokemon: any) => void}) => {

    if (pokemon) {

        return (
            <Dialog open={open}>
                
                <DialogContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1>{pokemon.name}</h1>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                        <img style={{width: '100px', height: '100px'}} src={getPokemonImage(pokemon)} alt={pokemon.name} />
                        <img style={{width: '100px', height: '100px'}} src={pokemon && (pokemon.sprites.back_default || pokemon.sprites.back_shiny || pokemon.sprites.back_female || "../../public/question-mark.png")} alt={pokemon.name} />
                    </div>
                    <h2>Types</h2>
                    <div className="types-container">
                        {pokemon.types.map((type: Type) => {
                            return <Chip key={type.type.name} label={type.type.name}></Chip>
                        })}
                    </div>
                    <h2>Forms</h2>
                    <div className="forms-container">
                        {pokemon.forms.map((form: Species) => {
                            return <Chip key={form.name} label={form.name}></Chip>
                        })}
                    </div>
                    <h2>Moves</h2>
                    <div className="moves-container">
                        {pokemon.moves.map((move: Move) => {
                            return <Chip key={move.move.name} label={move.move.name}></Chip>
                        })}
                    </div>
                    <div className="dialog-buttons-container">
                        <Button variant="contained" color="primary" onClick={() => {selectPokemon(pokemon); onClose()}}>Select Pokemon</Button>
                        <Button variant="contained" color="error" onClick={onClose}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}

export default PokemonDialogComponent;
