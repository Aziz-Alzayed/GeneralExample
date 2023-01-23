import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import AppRoutes from './AppRoutes';
import Container from './components/container/Container';
import store from './store/Store'
import AuthContainer from './components/users/AuthContainer'
import { isLoggedIn} from '../src/utils/Helpers';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;
    
    render() {
        let auth = isLoggedIn()
            ?
            <Container>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </Container>
            :
            <AuthContainer />
        return (
            <Provider store={store}>
                {auth}
            </Provider>
        );
    }
}
