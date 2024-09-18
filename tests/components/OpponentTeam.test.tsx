import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import axios from 'axios';
import OpponentTeamComponent from '../../src/opponent-team-generation/OpponentTeamComponent';
import { PokemonAPIResponse, Result } from '../../src/types/pokemonAPI';
import React from 'react';
import mockPokemons from './mockPokemons.json';

vi.mock('axios');

const mockSelectedPokemons = require('./mockSelectedPokemons.json');

const mockPokemonsList: Result[] = mockPokemons.results; 
const mockPokemonSpeciesResponses = require('./mockPokemonSpecies.json');

const mockPokemonDetailsResponses = require('./mockPokemonDetails.json');


vi.mocked(axios.get).mockImplementation((url: string) => {
  if (mockPokemonSpeciesResponses[url]) {
    return Promise.resolve({ data: mockPokemonSpeciesResponses[url] });
  }
  if (mockPokemonDetailsResponses[url]) {
    const data = { ...mockPokemonDetailsResponses[url], sprites: { front_default: null } }
    return Promise.resolve({ data : data});
  }
  if (mockPokemonSpeciesResponses[url]) {
    return Promise.resolve({ data: mockPokemonSpeciesResponses[url] });
  }

  console.log("URL non gestita: " + url);
  return Promise.reject(new Error('URL non gestita'));
});

describe('OpponentTeamComponent', () => {
  test('i Pokémon dell\'avversario non appartengono alle generazioni dei Pokémon scelti',
    async () => {
    render(
      <OpponentTeamComponent
        selectedPokemons={mockSelectedPokemons}
        pokemonsList={mockPokemonsList}
        opponentTeam={[]}
        setOpponentTeam={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.queryByTestId('circular-progress')).not.toBeInTheDocument();
    }, { timeout: 15000 }); 

    const opponentPokemonCards = screen.getAllByTestId('opponent-pokemon-card');
    expect(opponentPokemonCards).toHaveLength(4);
    const userPokemonGenerations = new Set(mockSelectedPokemons.map(pokemon => {
      const speciesUrl = pokemon.species.url;
      return mockPokemonSpeciesResponses[speciesUrl].generation.name;
    }));

    for (const card of opponentPokemonCards) {
      const pokemonName = card.textContent;
      const pokemonDetails = Object.values(mockPokemonDetailsResponses).find(p => p.name === pokemonName);
      const pokemonSpecies = mockPokemonSpeciesResponses[pokemonDetails.species.url];
      const pokemonGeneration = pokemonSpecies.generation.name;

      expect(userPokemonGenerations).not.toContain(pokemonGeneration);
    }
  });
});