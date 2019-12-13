import firebase from '@firebase/app';
import '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBod3ud6snQedtNGHb5OhyrMB1jB4GWsNk',
	authDomain: 'to-do-list-94a9c.firebaseapp.com',
	databaseURL: 'https://to-do-list-94a9c.firebaseio.com',
	projectId: 'to-do-list-94a9c',
	storageBucket: 'to-do-list-94a9c.appspot.com',
	messagingSenderId: '176759433221',
	appId: '1:176759433221:web:24078867328e24dcbd146c',
	measurementId: 'G-XZ3HMPCQK8',
};

// Initialize Firebase

export default firebase.apps[0] || firebase.initializeApp(firebaseConfig);
