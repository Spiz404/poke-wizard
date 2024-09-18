import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import axios from 'axios';
import OpponentTeamComponent from '../../src/opponent-team-generation/OpponentTeamComponent';
import { PokemonAPIResponse, Result } from '../../src/types/pokemonAPI';
import React from 'react';

vi.mock('axios');

const mockSelectedPokemons: PokemonAPIResponse[] = [
  {
    name: 'bulbasaur',
    species: { url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    // ... altri dettagli ...
  },
  {
    name: 'charmander',
    species: { url: 'https://pokeapi.co/api/v2/pokemon-species/4/' },
    // ... altri dettagli ...
  },
  // ... altri Pokémon selezionati ...
];

const mockPokemonsList: Result[] = [
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  // ... altri Pokémon ...
];

const mockPokemonSpeciesResponses = {
  'https://pokeapi.co/api/v2/pokemon-species/1/': { generation: { name: 'generation-i' } },
  'https://pokeapi.co/api/v2/pokemon-species/4/': { generation: { name: 'generation-i' } },
  'https://pokeapi.co/api/v2/pokemon-species/25/': { generation: { name: 'generation-i' } },
  'https://pokeapi.co/api/v2/pokemon-species/7/': { generation: { name: 'generation-i' } },
};

const mockPokemonDetailsResponses = {
  'https://pokeapi.co/api/v2/pokemon/25/': { name: 'pikachu', species: { url: 'https://pokeapi.co/api/v2/pokemon-species/25/' } },
  'https://pokeapi.co/api/v2/pokemon/7/': { name: 'squirtle', species: { url: 'https://pokeapi.co/api/v2/pokemon-species/7/' } },
};

vi.mocked(axios.get).mockImplementation((url: string) => {
  if (mockPokemonSpeciesResponses[url]) {
    return Promise.resolve({ data: mockPokemonSpeciesResponses[url] });
  }
  if (mockPokemonDetailsResponses[url]) {
    return Promise.resolve({ data: mockPokemonDetailsResponses[url] });
  }
  return Promise.reject(new Error('URL non gestita'));
});

describe('OpponentTeamComponent', () => {
  test('i Pokémon selezionati non appartengono alle generazioni dei Pokémon scelti', async () => {
    render(
      <OpponentTeamComponent
        selectedPokemons={mockSelectedPokemons}
        pokemonsList={mockPokemonsList}
        opponentTeam={[]}
        setOpponentTeam={vi.fn()}
      />
    );

        
    await waitFor(() => {
      const opponentPokemonCards = screen.getAllByTestId('opponent-pokemon-card');
      expect(opponentPokemonCards.length).toBe(4);
    });
    const opponentPokemonCards = screen.getAllByTestId('opponent-pokemon-card');
    const opponentPokemonGenerations = opponentPokemonCards.map(card => {
      const generation = card.getAttribute('data-generation');
      return generation;
    });

    const selectedPokemonGenerations = ['generation-i']; // Generazioni dei Pokémon selezionati

    opponentPokemonGenerations.forEach(generation => {
      expect(selectedPokemonGenerations).not.toContain(generation);
    });
  });
});