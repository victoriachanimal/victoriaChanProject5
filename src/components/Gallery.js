import React, { Component } from 'react';
import firebase from '../firebase';

const storage = firebase.storage();


class Gallery extends Component {
    render() {
        return(
           
            <div className="finalResult">
                {Object.keys(this.props.instaPost).map((key) => {
                    // map through each key inside instaPost object in App.js   
                    return(
                    
                    <div className="finalCaption" key={key}>
                    <img src={this.props.instaPost[key].image} alt="" />

                    <h4>{this.props.instaPost[key].name}</h4>

                    <p>{this.props.instaPost[key].caption}</p>

                    <p>{this.props.instaPost[key].author}</p>

                    </div>)
                })}
            </div>
        );
    }
}

export default Gallery;