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
import UserList from './AdminDashboard/UserManagement/UsersList';
import EditUser from './AdminDashboard/UserManagement/EditUser';
import AdminList from './AdminDashboard/AdminManagement/AdminsList';
import EditAdmin from './AdminDashboard/AdminManagement/EditAdmin';
import AddAdmin from './AdminDashboard/AdminManagement/AddAdmin';

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
                        <Route path="/users-list" component={UserList} />
                        <Route path="/edit-user/:id" component={EditUser} />
                        <Route path="/admins-list" component={AdminList} />
                        <Route path="/edit-admin/:id" component={EditAdmin} />
                        <Route path="/add-admin" component={AddAdmin} />

                        <Route path="/"  component={Shop} />

                        <Route path="/admin-dashboard"  component={Admin} />

                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
