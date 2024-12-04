#!/usr/bin/node

const fetch = require('node-fetch');

const movieId = process.argv[2];
if (!movieId) {
  console.error('Usage: ./0-starwars_characters.js <Movie ID>');
  process.exit(1);
}

const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

(async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movieData = await response.json();
    for (const characterUrl of movieData.characters) {
      const characterResponse = await fetch(characterUrl);
      const characterData = await characterResponse.json();
      console.log(characterData.name);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
