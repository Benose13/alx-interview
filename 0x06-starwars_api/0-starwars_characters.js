#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2];
if (!movieId) {
  console.error('Usage: ./0-starwars_characters.js <Movie ID>');
  process.exit(1);
}

const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

request(apiUrl, (err, res, body) => {
  if (err) {
    console.error(err);
    return;
  }

  if (res.statusCode !== 200) {
    console.error(`Error: Received status code ${res.statusCode}`);
    return;
  }

  const movieData = JSON.parse(body);
  const characters = movieData.characters;

  const printCharacter = (index) => {
    if (index >= characters.length) {
      return;
    }

    request(characters[index], (err, res, body) => {
      if (err) {
        console.error(err);
        return;
      }

      if (res.statusCode !== 200) {
        console.error(`Error: Received status code ${res.statusCode}`);
        return;
      }

      const characterData = JSON.parse(body);
      console.log(characterData.name);
      printCharacter(index + 1);
    });
  };

  printCharacter(0);
});
