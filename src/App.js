import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
// import axios from 'axios';
// import Qs from 'qs';

// COMPONENTS
import Form from './Form';
import Caption from './Caption';

//  Create a reference to the firebase database root and make it globally available:
const dbRef = firebase.database().ref(); 


class App extends Component {
  constructor() {
    super();
    this.state = {
      instaPost: {} // Create a state object that holds: User's uploaded image, username input and user caption 
    };
  }

  // addToDatabase = (userName, userKeyword) => {
  addToDatabase = (userName, userCaption, captionAuthor) => {
    dbRef.push({
      // pushing keys INTO the firebase, in the instaPost object
      // name: userName,
      name: userName,
      caption: userCaption,
      author: captionAuthor
    });
  }

  componentDidMount() {
    dbRef.on('value', (snapshot) => {

      this.setState({
        instaPost: snapshot.val(),
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>My App</h1>
        </header>

        <main>
          <div>
            <Form addToDatabase={this.addToDatabase} />
            <Caption instaPost={this.state.instaPost} />
          </div>
        </main>
        
      </div>
    );
  }
}

export default App;
