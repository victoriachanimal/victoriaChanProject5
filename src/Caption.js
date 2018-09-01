import React, { Component } from 'react';

class Caption extends Component {
    render() {
        return(
            <div className="captionResult">
                {Object.keys(this.props.instaPost).map((key) => {
                    // map through each key inside instaPost object in App.js   
                    return(
                    <div className="caption">

                    <h4 key={key}>{this.props.instaPost[key].name}</h4>

                    <p key={key}>{this.props.instaPost[key].caption}</p>

                    <p key={key}>{this.props.instaPost[key].author}</p>

                    </div>)
                })}
            </div>
        );
    }
}

export default Caption;