import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../../firebase';


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

    // Event handler for userImage input
     handleImageChange = (e) => {

        if(e.target.files[0]) {
            const url = e.target.files[0];
            this.setState(() => ({ url }));
        }
    }

    // Event handler for userImage submit
    handleImageUpload = (e) => {

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

    // Event handler for userName and userKeyword input
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }) 
    }

    // Event handler for getting a caption from Api
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

    // Event handler fo FINAL submit
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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                {/* Label + input for image upload */}
                <div className="imageInputs">
                    <label htmlFor="userImage" className="visuallyHidden">Upload Photo</label>

                    <input onChange={this.handleImageChange} type="file" id="userImage" placeholder="Browse" accept="image/*" autoComplete="off" />

                    <button onClick={this.handleImageUpload} className="imageUploadBtn">Upload Your Pic</button>
                    <progress value={this.state.progress} max="100" />
                </div>

                {/* Container for Insta post items */}
                <div className="postContainer">

                    {/* Image container*/}
                    <div className="image">        
                        <img className="cover" src={this.state.url} />  
                    </div>

                    {/* Caption inputs container*/}
                    {this.state.showMe?
                    <div className="captionInputs">
                        <div className="nameInput">
                            <label htmlFor="userName">Your name</label>
                            <input onChange={this.handleChange} type="text" id="userName" placeholder="Your name" value={this.state.userName}/>
                        </div>
                        <div className="keywordInput">
                            <label htmlFor="userKeyword">Type in a word that reflects your current vibe</label>
                            <input onChange={this.handleChange} type="text" id="userKeyword" placeholder="Type in keyword" value={this.state.userKeyword}/>
                             <div className="captionBtnContainer">
                                <button className="getCaptionBtn" onClick={this.getCaption}>
                                Caption This
                                </button> 
                            </div>    
                        </div>
                    </div>
                    :null
                    }
 
                    {/* Caption results container */}
                    { this.state.userCaption ?
                    <div className="captionResult wrapper">
                        <div className="instaHeader">
                            <div className="headerImage">
                                <img className="cover" src={this.state.url} /> 
                            </div>
                            <h4>{this.state.userName}</h4>
                        </div>
                        <div className="captionContainer">
                            <div className="caption">
                                <p><span className="bold">{this.state.userName}</span>"{this.state.userCaption}"</p>
                                <p className="author">-{this.state.captionAuthor}</p>
                            </div>
                        </div>
                        <div className="saveResult">
                            <button className="anotherCaptionBtn" onClick={this.getCaption}>Another one, pls</button>
                            <input type="submit" onClick={this.handleSubmit} id="finalSubmitBtn" className="save" value="Love it? Save it." />
                        </div>
                        <p className="warning">*By saving, your image and caption will be posted in the gallery below.</p>
                    </div>
                    : null
                    }
                </div>
            </form>
        )
    }
}

export default Form;