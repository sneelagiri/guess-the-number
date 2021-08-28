import React, { Component } from "react";
import axios from "axios";
const databaseUrl = "http://localhost:4000";

export default class HandleGuess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numGuesses: 3,
      randomNumber: 0,
      userGuess: 0,
      win: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if ((this.state.numGuesses = 3)) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      this.setState({
        randomNumber: randomNumber,
      });
      await axios.post(`${databaseUrl}/guesses-left`, {
        guessesLeft: this.state.numGuesses,
      });
    }
  }

  evaluateGuess = () => {
    if (this.state.randomNumber == this.state.userGuess) {
      this.setState({ win: true });
    } else if (this.state.numGuesses === 1) {
      this.setState({ win: false });
    } else {
      this.decreaseGuesses();
    }
  };

  decreaseGuesses = async () => {
    this.setState({
      numGuesses: this.state.numGuesses - 1,
    });
    await axios.post(`${databaseUrl}/guesses-left`, {
      guessesLeft: this.state.numGuesses,
    });
  };

  handleChange(event) {
    this.setState({
      userGuess: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  playAgain = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    this.setState({
      numGuesses: 3,
      win: null,
      randomNumber: randomNumber,
      userGuess: 0,
    });
  };

  render() {
    return (
      <div>
        {this.state.win === null ? (
          <div>
            <h2>Number of Guesses Left: {this.state.numGuesses}</h2>
            <form onSubmit={this.handleSubmit}>
              <label>Your guess: </label>
              <input
                type="number"
                name="guess"
                value={this.state.userGuess}
                onChange={this.handleChange}
              />
              <input type="submit" name="Submit" onClick={this.evaluateGuess} />
              <button>Reset</button>
            </form>
          </div>
        ) : this.state.win === false ? (
          <div>
            <h1>You lose. Please click reset to try again.</h1>
            <button onClick={this.playAgain}>Play again</button>
          </div>
        ) : (
          <div>
            <h1>Congratulations! You won!</h1>
            <button onClick={this.playAgain}>Play again</button>
          </div>
        )}
      </div>
    );
  }
}
