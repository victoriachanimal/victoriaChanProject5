import firebase from 'firebase'; 

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCqeXnQH5gToDzYcoQJBKExyeT3I4xh1E4",
    authDomain: "victoria-chan-project5.firebaseapp.com",
    databaseURL: "https://victoria-chan-project5.firebaseio.com",
    projectId: "victoria-chan-project5",
    storageBucket: "victoria-chan-project5.appspot.com",
    messagingSenderId: "1030276972282"
};

firebase.initializeApp(config);

export default firebase;