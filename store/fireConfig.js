import { firebase } from '@firebase/app';
import 'firebase/database';

export default class FireConfig {
    firebaseConfig;

    constructor() {
        this.firebaseConfig = {
            apiKey: 'AIzaSyCEpjYN5-82hQq-2ZrfCxvZXjCoa4ytBws',
            authDomain: 'shopping-database-d9fe1.firebaseapp.com',
            databaseURL: 'https://shopping-database-d9fe1.firebaseio.com',
            projectId: 'shopping-database-d9fe1',
            storageBucket: 'shopping-database-d9fe1.appspot.com',
            messagingSenderId: '164198308970',
            appId: '1:164198308970:web:87e3d8865d94984d073e13',
            measurementId: 'G-26E55CJX0G'
        };
    }

    get database() {
        return this.initializeApp().database();
    }

    initializeApp() {
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        return firebase;
    }
}