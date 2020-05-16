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
import StoreManager from './StoreManagerDashboard';
import StoreManagerList from './AdminDashboard/ManagerManagement/StoreManagersList';
import AddStoreManager from './AdminDashboard/ManagerManagement/AddStoreManager';
import EditStoreManager from './AdminDashboard/ManagerManagement/EditStoreManager';

import CategoryList from './AdminDashboard/ManageCategory/CategoryList';
import AddCategory from './AdminDashboard/ManageCategory/AddCategory';
import EditCategory from './AdminDashboard/ManageCategory/EditCategory';


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
                        <Route path="/store-managers-list" component={StoreManagerList} />
                        <Route path="/add-store-manager" component={AddStoreManager} />
                        <Route path="/edit-store-manager/:id" component={EditStoreManager} />
                        <Route path="/edit-category/:id" component={EditCategory} />
                        <Route path="/add-category" component={AddCategory} />
                        <Route path="/category-list" component={CategoryList} />
                        <Route path="/edit-category/:id" component={EditCategory} />

                        <Route path="/"  component={Shop} />

                        <Route path="/admin-dashboard"  component={Admin} />
                        <Route path="/store-manager-dashboard"  component={StoreManager} />

                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
