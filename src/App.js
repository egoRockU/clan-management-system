import './App.css';
import Add from './components/Add';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path='/create'>
              <Add />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router> 
  );
}

export default App;
