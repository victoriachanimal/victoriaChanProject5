import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../firebase';

// Create a reference to firebase storage service (methods)
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
            userKeyword: '',
        }

        this.handleImageChange = this.handleImageChange.bind(this);

        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    // Event Handler for userImage input
     handleImageChange = (e) => {
        // this.setState({  
        //     [e.target.id]: e.target.files[0]
        //     selectedFile: e.target.files[0]
        // })

        if(e.target.files[0]) {
            const userImage = e.target.files[0];
            this.setState(() => ({userImage}));
        }
    }

    // Event Handler for userImage submit
    handleImageUpload = (e) => {
        // Preventing from refreshing 
        e.preventDefault();

        const {userImage} = this.state;

        const uploadTask = storage.ref(`images/${userImage.name}`).put(userImage);

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
            
            storage.ref('images').child(userImage.name).getDownloadURL().then(url => {
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

    // Event Handler for submitting everything
    handleSubmit = (e) => {
        // Prevent from refreshing 
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
            
            // PROPS
            this.props.addToDatabase(this.state.userName, userCaption, captionAuthor);

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

                            <input id="submit" type="submit" value="Caption This" />
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default Form;