import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';

// Main Components:
import Form from './components/Form';
import Gallery from './components/Gallery';

// Icon Components:
import Lightning from './styles/assets/Lightning';
import Eye from './styles/assets/Eye';
import Star from './styles/assets/Star';

//  Create a reference to the firebase database root and make it globally available:
const dbRef = firebase.database().ref(); 
const storage = firebase.storage();


class App extends Component {
  constructor() {
    super();
    this.state = {
      instaPost: {} // Create a state object that holds: User's username, caption, author, and uploaded image url
    };
  }

  addToDatabase = (userName, userCaption, captionAuthor, url) => {
    dbRef.push({
      // pushing keys INTO the firebase, in the instaPost object
      name: userName,
      caption: userCaption,
      author: captionAuthor,
      image: url
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
            <Form addToDatabase={this.addToDatabase} instaPost={this.state.instaPost} />

            <h3>Gallery</h3>
            <Gallery className="gallery" instaPost={this.state.instaPost} imageResult={this.state.url} />
          </div>
        </main>  

        <footer>
          <p className="copyright">&copy; Victoria Chan</p>
        </footer>
      </div>
    );
  }
}

export default App;
