import { it, expect, describe, vi } from 'vitest'
import { render, screen, fireEvent, waitFor, within, prettyDOM } from '@testing-library/react'
import '@testing-library/jest-dom'
import TrainerComponent from '../../src/trainer-details/TrainerComponent'
import { TrainerDetails } from '../../src/types/appTypes'
import React from 'react'
import App from '../../src/App'
import axios from 'axios';

const mockTrainerDetails: TrainerDetails = {
    playerName: '',
    teamName: 'Team Rocket',
    pokemonType: 'Fire'
}


/*
describe('Navigation', () => {
    test('show an error snackbar when trainer details are not set', () => {
        render(
            <App />
        )
        fireEvent.click(screen.getByText('next'))
        const errorSnackbar = document.getElementById('error-snackbar')
        expect(errorSnackbar).toBeInTheDocument()
    })
})


describe('App', () => {

    vi.mock('axios');
    beforeEach(() => {
      vi.mocked(axios.get).mockResolvedValue({
        data: {
          results: [
            { name: 'normal' },
            { name: 'fire' },
            { name: 'water' },
            {name : 'electric'},
            {name : 'grass'},
            {name : 'ice'},
            {name : 'fighting'},
            {name : 'poison'},
            {name : 'ground'},
            {name : 'flying'},
            {name : 'psychic'},
            {name : 'bug'},
            
          ]
        }
      });
    });

    test('compila il form del trainer e procede alla pagina successiva senza errori', async () => {
      render(<App />);

      await screen.findByText('Trainer details');

      const playerNameInput = screen.getByLabelText('Player name');
      fireEvent.change(playerNameInput, { target: { value: 'Ash' } });

      const teamNameInput = screen.getByLabelText('Team name');
      fireEvent.change(teamNameInput, { target: { value: 'Team Rocket' } });

      await waitFor(() => {
        expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
      });

      const pokemonTypeInput = screen.getByTestId('pokemon-type');
      fireEvent.mouseDown(pokemonTypeInput.querySelector('input')!);
      const fireOption = await screen.findByText('fire');
      fireEvent.click(fireOption);

      const nextButton = screen.getByText('next');
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });

      expect(screen.getByText('No pokemons selected, select your team!')).toBeInTheDocument();
    });
});
*/


vi.mock('axios');

describe('App', () => {
  beforeEach(() => {
   
    vi.mocked(axios.get).mockImplementation((url : string) => {
        if (url.includes('/type')) {
            return Promise.resolve({
              data: {
                results: [
                  {name : 'poison'},  
                  { name: 'normal' },
                  { name: 'fire' },
                  { name: 'water' },
                  {name : 'electric'},
                  {name : 'grass'},
                  {name : 'ice'},
                  {name : 'fighting'},
                  {name : 'poison'},
                  {name : 'ground'},
                  {name : 'flying'},
                  {name : 'psychic'},
                  {name : 'bug'},
                ]
              }
            })
        }

        return Promise.reject(new Error('Invalid URL'));
    })
})
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Show an error snackbar when trainer details are not set and next button is clicked', async () => {
    render(<App />);
    
    await screen.findByText('Trainer details');
    
    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);
    
    const errorSnackbar = await screen.findByRole('alert');
    expect(errorSnackbar).toBeInTheDocument();
  });

  test('Fill the trainer form and proceed to the next page without errors', async () => {
    render(<App />);

    await screen.findByText('Trainer details');

    const playerNameInput = screen.getByLabelText('Player name');
    fireEvent.change(playerNameInput, { target: { value: 'Ash' } });

    const teamNameInput = screen.getByLabelText('Team name');
    fireEvent.change(teamNameInput, { target: { value: 'Team Rocket' } });

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    });

    const pokemonTypeInput = screen.getByTestId('pokemon-type');
    fireEvent.mouseDown(pokemonTypeInput.querySelector('input')!);
    const fireOption = await screen.findByText('fire');
    fireEvent.click(fireOption);

    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Pokemon team selection')).toBeInTheDocument();
  });
});