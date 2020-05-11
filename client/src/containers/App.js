import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login/loginIndex';
import Signup from './SignUp/SignUpIndex';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
