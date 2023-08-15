import './App.css';
import Add from './components/Add';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path='/create'>
              <Add />
            </Route>
            <Route path='/profile/:id'>
              <Profile />
            </Route>
            <Route exact path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router> 
  );
}

export default App;
