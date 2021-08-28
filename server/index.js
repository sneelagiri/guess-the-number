const express = require("express");
const cors = require("cors");
const app = express();
const NumberOfGuesses = require("./db.js");

const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post("/guesses-left", async (request, response, next) => {
  try {
    const guesses = await NumberOfGuesses.create({
      guessesLeft: request.body.guessesLeft,
    });
    response.status(201).send(guesses);
    console.log(guesses)
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => console.log(`Server listening on port ${port}!`));
