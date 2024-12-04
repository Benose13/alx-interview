#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2]; // Get the Movie ID from command-line arguments
if (!movieId) {
  console.error('Usage: ./0-starwars_characters.js <Movie ID>');
  process.exit(1);
}

const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

// Fetch movie details
request(apiUrl, (err, res, body) => {
  if (err) {
    console.error(err);
    return;
  }

  if (res.statusCode !== 200) {
    console.error(`Failed to fetch movie. Status code: ${res.statusCode}`);
    return;
  }

  const movieData = JSON.parse(body);
  const characterUrls = movieData.characters;

  // Fetch and print each character in the correct order
  const fetchCharacter = (url) => {
    return new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        if (err) reject(err);
        else resolve(JSON.parse(body).name);
      });
    });
  };

  (async () => {
    try {
      for (const url of characterUrls) {
        const name = await fetchCharacter(url);
        console.log(name);
      }
    } catch (err) {
      console.error(`Error fetching character: ${err.message}`);
    }
  })();
});
