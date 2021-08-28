const Sequelize = require("sequelize");

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/postgres'

const sequelize = new Sequelize(connectionString);

const NumberOfGuesses = sequelize.define('guesses', {
    guessesLeft: {
        type: Sequelize.INTEGER
    }
})

sequelize.sync()

module.exports = NumberOfGuesses;