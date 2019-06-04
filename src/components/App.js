import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import '../styles/custom.css';

class App extends React.Component {

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <BrowserRouter >
                            <div className="loader">
                                <Route exact path="/" component={HomePage} />
                                <Route path="/login"
                                    render={(props) => (
                                        <LoginPage {...props} />
                                    )}
                                />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;