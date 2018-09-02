import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';

// MAIN COMPONENTS:
import Form from './components/Form';
import Caption from './components/Caption';

// Icon Components:
import Lightning from './styles/assets/Lightning';
import Eye from './styles/assets/Eye';
import Ghost from './styles/assets/Ghost';
import Heart from './styles/assets/Heart';
import Mouth from './styles/assets/Mouth';
import Star from './styles/assets/Star';

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
          <div className="headerLogo">
            <Lightning />
            <h1>Caption this</h1>
            <Star />
            <Eye />
          </div>
          <h2>your photo, their words</h2>
        </header>

        <main className="wrapper">
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
