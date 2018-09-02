import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

// COMPONENTS
import Form from './components/Form';
import Caption from './components/Caption';

//  Create a reference to the firebase database root and make it globally available:
const dbRef = firebase.database().ref(); 


class App extends Component {
  constructor() {
    super();
    this.state = {
      instaPost: {} // Create a state object that holds: User's uploaded image, username input and user caption 
    };
  }

  addToDatabase = (userName, userCaption, captionAuthor) => {
    dbRef.push({
      // pushing keys INTO the firebase, in the instaPost object
     
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
        <header>
          <h1>Test</h1>
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
