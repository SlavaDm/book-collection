import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
	apiKey: 'AIzaSyCtYPC7_HR7MbH3BvN5rPgfQC3Pjv8M1u4',
	authDomain: 'book-collection-be281.firebaseapp.com',
	projectId: 'book-collection-be281',
	storageBucket: 'book-collection-be281.appspot.com',
	messagingSenderId: '47570738890',
	appId: '1:47570738890:web:c3ec515fbb05584d5d9e33'
})

export const firestore = firebase.firestore()

