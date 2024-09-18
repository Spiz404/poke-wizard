/*
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

const mockPokemonSpeciesResponses = {
  'https://pokeapi.co/api/v2/pokemon-species/1/': { generation: { name: 'generation-i' } },
  'https://pokeapi.co/api/v2/pokemon-species/4/': { generation: { name: 'generation-i' } },
  'https://pokeapi.co/api/v2/pokemon-species/25/': { generation: { name: 'generation-i' } },
  'https://pokeapi.co/api/v2/pokemon-species/7/': { generation: { name: 'generation-i' } },
};

const mockPokemonDetailsResponses = {
  'https://pokeapi.co/api/v2/pokemon/25/': { name: 'pikachu', species: { url: 'https://pokeapi.co/api/v2/pokemon-species/25/' } },
  'https://pokeapi.co/api/v2/pokemon/7/': { name: 'squirtle', species: { url: 'https://pokeapi.co/api/v2/pokemon-species/7/' } },
  'https://pokeapi.co/api/v2/pokemon/4/': { name: 'charmander', species: { url: 'https://pokeapi.co/api/v2/pokemon-species/4/' } },
  'https://pokeapi.co/api/v2/pokemon/1/': { name: 'bulbasaur', species: { url: 'https://pokeapi.co/api/v2/pokemon-species/1/' } },
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
      const circularProgress = screen.getByTestId('circular-progress');
      expect(circularProgress).not.toBeInTheDocument();
      
    });
    /*
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

*/

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

const mockPokemonDetailsResponses = require('../mockPokemonDetails.json');
vi.mocked(axios.get).mockImplementation((url: string) => {
  if (mockPokemonSpeciesResponses[url]) {
    return Promise.resolve({ data: mockPokemonSpeciesResponses[url] });
  }
  if (mockPokemonDetailsResponses[url]) {
    const data = { ...mockPokemonDetailsResponses[url], sprites: { front_default: null } }
    return Promise.resolve({ data : data});
  }
  if (mockPokemonSpeciesResponses[url]) {
    console.log("URL: " + url + " " + mockPokemonSpeciesResponses[url]);
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

    // Verifica che ci siano 4 Pokémon nel team avversario
    await waitFor(() => {
      expect(screen.queryByTestId('circular-progress')).not.toBeInTheDocument();
    }, { timeout: 15000 }); 

    const opponentPokemonCards = screen.getAllByTestId('opponent-pokemon-card');
    expect(opponentPokemonCards).toHaveLength(4);

    // Ottieni le generazioni dei Pokémon selezionati dall'utente
    const userPokemonGenerations = new Set(mockSelectedPokemons.map(pokemon => {
      const speciesUrl = pokemon.species.url;
      return mockPokemonSpeciesResponses[speciesUrl].generation.name;
    }));

    // Verifica che ogni Pokémon dell'avversario non appartenga alle generazioni dei Pokémon dell'utente
    for (const card of opponentPokemonCards) {
      const pokemonName = card.textContent;
      const pokemonDetails = Object.values(mockPokemonDetailsResponses).find(p => p.name === pokemonName);
      const pokemonSpecies = mockPokemonSpeciesResponses[pokemonDetails.species.url];
      const pokemonGeneration = pokemonSpecies.generation.name;

      expect(userPokemonGenerations).not.toContain(pokemonGeneration);
    }
  });
});