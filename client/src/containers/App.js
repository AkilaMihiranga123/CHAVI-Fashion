import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducers from '../reducers/authReducers';
import Shop from './Shop/index';
import Login from './Login/loginIndex';
import Signup from './SignUp/SignUpIndex';
import Admin from './AdminDashboard';

const rootReducers = combineReducers({
    auth: authReducers
});

const store = createStore(rootReducers, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/products"  component={Shop} />
                        <Route path="/"  component={Shop} />
                        <Route path="/admin-dashboard"  component={Admin} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
