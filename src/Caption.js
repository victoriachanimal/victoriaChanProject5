import React, { Component } from 'react';

class Caption extends Component {
    render() {
        return(
            <div className="captionResult">
                {Object.keys(this.props.instaPost).map((key) => {
                    // map through each key inside instaPost object in App.js   
                    return(
                    <div className="caption" key={key}>

                    <h4>{this.props.instaPost[key].name}</h4>

                    <p>{this.props.instaPost[key].caption}</p>

                    <p>{this.props.instaPost[key].author}</p>

                    </div>)
                })}
            </div>
        );
    }
}

export default Caption;