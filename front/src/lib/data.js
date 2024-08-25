// src/services/pokemonService.js
const API_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Récupère une liste de Pokémon depuis l'API.
 * @param {number} limit - Le nombre de Pokémon à récupérer.
 * @returns {Promise<Object>} - Une promesse avec les données de la réponse.
 */
export async function getPokemons(limit = 151) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
}

// Vous pouvez ajouter d'autres fonctions pour d'autres points d'API ici.
