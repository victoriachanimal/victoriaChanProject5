import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../firebase';

// // Create a reference to firebase storage service (methods)
const storage = firebase.storage();

class Form extends Component {
    constructor(props) {
        super(props);

        // Set state to keep track of changes (ie. what the user inputs) 
        this.state = {
            userImage: '',
            url: '',
            progress: 0,
            userName: '',
            userCaption: '',
            captionAuthor: '',
            userKeyword: '',
            showMe: true,
        }

        this.handleImageChange = this.handleImageChange.bind(this);
        this.getCaption = this.getCaption.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    // Event Handler for userImage input
     handleImageChange = (e) => {

        if(e.target.files[0]) {
            // const userImage = e.target.files[0];
            // this.setState(() => ({userImage}));
            const url = e.target.files[0];
            this.setState(() => ({ url }));
        }
    }

    // Event Handler for userImage submit
    handleImageUpload = (e) => {
        // Preventing from refreshing 
        e.preventDefault();

        const {url} = this.state;

        const uploadTask = storage.ref(`images/${url.name}`).put(url);

        uploadTask.on('state_changed', (snapshot) => {
            // Progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            this.setState({progress});

            // Observe state change events such as progress, pause, and resume
        }, (error) => {
            // Handle unsuccessful uploads
            console.log(error);
        }, () => {

            // Do something once upload is complete   
            storage.ref('images').child(url.name).getDownloadURL().then(url => {
               this.setState({url});
               
            })
        });
    }

    // Event Handler for userName and userKeyword input
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }) 
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // api caption, username, and author are in form state. we are cool with all this data time to send it to firebase
        this.props.addToDatabase(this.state.userName, 
            this.state.userCaption, 
            this.state.captionAuthor,
            this.state.url
        );


        this.setState({ 
            userImage: '',
            url: '',
            progress: 0,
            userName: '',
            userCaption: '',
            captionAuthor: '',
            userKeyword: '',
            showMe: true,
         })
    }



    // Event Handler for getting a caption from api
    getCaption = (e) => {

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

            // Select a random quote off a list of quotes relating to user's keyword
            const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];

            // Create two variables to store the user's final results: a caption, and the author of caption
            const userCaption = randomQuote.body;
            const captionAuthor = randomQuote.author;

            this.setState({ userCaption, captionAuthor, showMe: false });
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                {/* Label + Input for Image Upload */}
                <div className="imageInputs">
                    <label htmlFor="userImage" className="visuallyHidden">Upload Photo</label>

                    <input onChange={this.handleImageChange} type="file" id="userImage" placeholder="Browse" accept="image/*" autoComplete="off" />

                    <button onClick={this.handleImageUpload} className="imageUpload">Upload Your Pic</button>

                    <progress value={this.state.progress} max="100" />
                </div>

                <div className="postContainer">
                    <div className="image">        
                        <img src={this.state.url || 'https://dummyimage.com/600x400/000000/ffffff.png'} alt="Uploaded image" height="300" width="400" />     
                    </div>

                    {this.state.showMe?
                    <div className="captionInputs">
                        {/* Label + Input for User Name */}
                        <div className="nameInput">
                            <label htmlFor="userName">Your Name</label>
                            <input onChange={this.handleChange} type="text" id="userName" placeholder="Your Name" value={this.state.userName}/>
                        </div>

                        {/* Label + Input for User Artist Search */}
                        <div className="keywordInput">
                            <label htmlFor="userKeyword">Type in a word that reflects your current vibe</label>
                            <input onChange={this.handleChange} type="text" id="userKeyword" placeholder="Type in keyword" value={this.state.userKeyword}/>

                            <button onClick={this.getCaption}>
                                Caption This
                            </button>
                        </div>
                    </div>
                    :null
                    }

                    <div className="captionResult">
                        { this.state.userCaption ?
                            <div>
                                <div className="caption">
                                    <h4>{this.state.userName}</h4>
                                    <p>{this.state.userCaption}</p>
                                    <p>{this.state.captionAuthor}</p>
                                </div>
                                <button className="another" onClick={this.getCaption}>Another one, please</button>
                                <input type="submit" onClick={this.handleSubmit} id="submit" className="save" value="Love it? Save it."/>
                            </div>
                        : null
                        }
                    </div>
                </div>
            </form>
        )
    }
}

export default Form;