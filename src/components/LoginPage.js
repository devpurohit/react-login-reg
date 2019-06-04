import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false,
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            let here = this;
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function () {
                    firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
                        localStorage.setItem('loggedIn', true);
                        here.setState({
                            ...here.state,
                            error: false
                        });
                        here.props.history.push('/');
                    },
                        (error) => {
                            console.log("error", error);
                            here.setState({
                                ...here.state,
                                error: true
                            });
                        });
                })

        }
    }

    render() {
        const { email, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>

                        {<Link to="/register" className="btn btn-link">Register</Link>
                        }                    </div>
                </form>
                {
                    this.state.error &&
                    <div className="alert alert-danger" >
                        <p>Credentials entered are invalid.</p>
                    </div>
                }
            </div>
        );
    }
}

export default LoginPage;