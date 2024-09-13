import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip } from '@mui/material'
import { PokemonAPIResponse } from './types/pokemonAPI'

const PokemonComponent = ({pokemon, open, onClose, selectPokemon}: {pokemon: PokemonAPIResponse, open: boolean, onClose: () => void, selectPokemon: (pokemon: any) => void}) => {

    return (
        <Dialog open={open}>
            
            <DialogContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1>{pokemon.name}</h1>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <img src={pokemon && pokemon.sprites.front_default} alt={pokemon.name} />
                    <img src={pokemon && pokemon.sprites.back_default} alt={pokemon.name} />
                </div>
                <h2>Types</h2>
                <div className="types-container">
                    {pokemon.types.map((type: any) => {
                        return <Chip key={type.type.name} label={type.type.name}></Chip>
                    })}
                </div>
                <h2>Forms</h2>
                <div className="forms-container">
                    {pokemon.forms.map((form: any) => {
                        return <Chip key={form.name} label={form.name}></Chip>
                    })}
                </div>
                <h2>Moves</h2>
                <div className="moves-container">
                    {pokemon.moves.map((move: any) => {
                        return <Chip key={move.name} label={move.move.name}></Chip>
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

export default PokemonComponent;
