importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

const config =  { 
    apiKey: "AIzaSyCp6H94uOjFnuEvgDEoTt2V_PLtt0DBnrs",
    projectId: "answercommunity-328ec",
    messagingSenderId: "471754929471",
    appId: "1:471754929471:web:76a974475f1d82dbf54f8a",
}; 
firebase.initializeApp(config);

const messaging = firebase.messaging();