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
                    <div className="galleryPost" key={key}>
                        <div className="galleryPostHeader">
                            <div className="headerImage">
                                <img className="cover" src={this.props.instaPost[key].image} />
                            </div>
                            <h4>{this.props.instaPost[key].name}</h4>
                        </div>

                        <div className="image">
                            <img className="cover" src={this.props.instaPost[key].image} alt="Your next Instagram image" />
                        </div>

                        <div className="galleryPostCaption">
                            <p><span className="bold">{this.props.instaPost[key].name}</span>"{this.props.instaPost[key].caption}"</p>
                            <p className="author">-{this.props.instaPost[key].author}</p>
                        </div>
                    </div>
                    )
                })}
            </div>
        );
    }
}

export default Gallery;