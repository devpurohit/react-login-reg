import React from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name: "",
            password: "",
            dob: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;

        this.setState({
            ...user,
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let hist = this.props.history;
        this.setState({ submitted: true });
        const { email, password, name, dob } = this.state;
        console.log(this.state)
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                firebase.database().ref('users/' + user.user.uid).set({
                    name,
                    email,
                    dob
                }
                );
                hist.push('/');
            });
    }

    render() {
        const user = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' +
                        (user.submitted && !user.name ? ' has-error' : '')}>
                        <label htmlFor="name"> Name</label>
                        <input type="text" className="form-control" name="name" value={user.name} onChange={this.handleChange} />
                        {user.submitted && !user.name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>

                    <div className={'form-group' +
                        (user.submitted && !user.dob ? ' has-error' : '')}>
                        <label htmlFor="dob"> Name</label>
                        <input type="date" className="form-control" name="dob" value={user.dob} onChange={this.handleChange} />
                        {user.submitted && !user.dob &&
                            <div className="help-block">Date of Birth is required</div>
                        }
                    </div>

                    <div className={'form-group' + (user.submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {user.submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>

                    <div className={'form-group' + (user.submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {user.submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {<Link to="/login" className="btn btn-link">Cancel</Link>
                        }                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterPage;