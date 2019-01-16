import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.TWO_UP_EXPENSES,
  authDomain: 'react-two-up-expenses.firebaseapp.com',
  databaseURL: 'https://react-two-up-expenses.firebaseio.com',
  projectId: 'react-two-up-expenses',
  storageBucket: 'react-two-up-expenses.appspot.com',
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});

const expensesRef = db.collection('expenses');
export default expensesRef;
