import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from '../src/pages/auth/Login';
import Register from '../src/pages/auth/Register';
import Dashboard from '../src/pages/dashboard/Dashboard';
import TicTacToe from '../src/pages/games/TicTacToe';
import NumberPuzzle from '../src/pages/games/NumberPuzzle';
import MemoryGame from '../src/pages/games/MemoryGame';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
           <Route path="/tic-tac-toe">
            <TicTacToe />
          </Route>
           <Route path="/number-puzzle">
            <NumberPuzzle />
          </Route>
           <Route path="/memory-game">
            <MemoryGame />
          </Route>
          {/* always / route is last add bcz / matches all routes, so the same component renders everywhere. */}
          <Route path="/">
            <Login />
          </Route>
        </Switch >
      </Router >
    </>
  );
}

export default App;
