import React from 'react';
import firebase from 'firebase';

class HomePage extends React.Component {
    state = {
        email: '',
        name: '',
        dob: '',
        loading: true

    }

    clickHandler = () => {
        let hist = this.props.history;
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("signedout")
            localStorage.setItem('loggedIn', false);
            hist.push('/login');
        }).catch(function (error) {
            console.log(error);
            // An error happened.
        });

    }

    componentDidMount() {
        let here = this;
        console.log('CDM', localStorage.getItem('loggedIn'))
        if (localStorage.getItem('loggedIn') !== "true") {
            this.props.history.push('/login');
        }

        setTimeout(() => {
            var userId = firebase.auth().currentUser.uid; // Gets current user uid as string
            firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                here.setState(snapshot.val());
                here.setState({ loading: false });
                console.log(here.state);
            })
        },
            1000);


    }

    render() {
        const { loading } = this.state;

        if (loading) {
            return null;
        }
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi !</h1>
                <p>You're logged in as  {this.state.name}!!</p>
                <p>Email:  {this.state.email}</p>
                <p>Date of Birth: {this.state.dob}</p>
                <p>
                    <button type="button" className="btn btn-default" onClick={this.clickHandler} >Logout</button>
                </p>
            </div>
        );
    }
}

export default HomePage;