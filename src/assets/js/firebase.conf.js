import Firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECTID
}

const firebase = Firebase.initializeApp(config)
const db = firebase.database()

export default db
