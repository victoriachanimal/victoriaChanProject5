import React, { Component } from 'react';
import axios from 'axios';
// import Qs from 'qs';

class Form extends Component {
    constructor() {
        super();

        // Set state to keep track of changes (ie. what the user inputs) 
        this.state = {
            userName: '',
            userKeyword: '',
        }
    }

    handleChange = (e) => {
        // console.log(e.target.value);

        this.setState({
            [e.target.id]: e.target.value
        }) 
    }

    handleSubmit = (e) => {
        // preventing page from refreshing 
        e.preventDefault();

        // API REQUEST: Get list of quotes, based on user's keyword input
        axios.get('https://favqs.com/api/quotes', {
            params: {
                filter: this.state.userKeyword,
            },
            headers: {
                'Authorization': `Token token="1c9b7094e9b6d9ca7f8246a9bf600802"`,
            }
        }).then(({ data }) => {
            // console.log(data);

            // Select a random quote off a list of quotes relating to user's keyword
            const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];

            // Create two variables to store the user's final results: a caption, and the author of caption
            const userCaption = randomQuote.body;
            const captionAuthor = randomQuote.author;

            console.log(userCaption, captionAuthor);
            // there might need to be a prop somewhere
            
            // PROPS
            // this.props.addToDatabase(this.state.userName, this.state.userKeyword);

            this.props.addToDatabase(this.state.userName, userCaption, captionAuthor);

        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                {/* Label + Input for User Name */}
                <label htmlFor="userName">Your Name</label>
                <input onChange={this.handleChange} type="text" id="userName" placeholder="Your Name" value={this.state.userName}/>

                {/* Label + Input for User Artist Search */}
                <label htmlFor="userKeyword">Type in a word that reflects your current vibe</label>
                <input onChange={this.handleChange} type="text" id="userKeyword" placeholder="Type in keyword" value={this.state.userKeyword}/>

                <input type="submit" value="Give me a caption"/>
            </form>
        )
    }
}

export default Form;