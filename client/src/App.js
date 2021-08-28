import './App.css';
import HandleGuess from './components/HandleGuess';

function App() {
  return (
    <div className="App">
      <h1>Guess the Number</h1>
      <h2>Instructions</h2>
      <p>Guess a number between 1 and 100. You have three attempts. You win the game if you are able to guess the number within three guesses. You lose and you have to restart if you do not.</p>
      <HandleGuess></HandleGuess>
    </div>
  );
}

export default App;
