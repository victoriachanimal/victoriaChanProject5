import React, { Component } from 'react';

// Gallery Stylesheet:
import './Gallery.css';

class Gallery extends Component {
    render() {
        return(
           
            <div className="finalResult">
                {Object.keys(this.props.instaPost).map((key) => {
                    // Map through each key inside instaPost object (in App.js) and display results on page   
                    return(     
                    <div className="galleryPost" key={key}>
                        <div className="galleryPostHeader">
                            <div className="headerImage">
                                <img className="cover" src={this.props.instaPost[key].image} alt="Your uploaded pic"/>
                            </div>
                            <h4>{this.props.instaPost[key].name}</h4>
                        </div>

                        <div className="image">
                            <img className="cover" src={this.props.instaPost[key].image} alt="Your next Instagram pic" />
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