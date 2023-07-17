function firebaseAppInit() {
    return firebase.initializeApp({
        apiKey: "AIzaSyCe4wTxCLdm581_wobRgxyY60XD6jMshBg",
        authDomain: "fir-bb3d4.firebaseapp.com",
        projectId: "fir-bb3d4",
        storageBucket: "fir-bb3d4.appspot.com",
        messagingSenderId: "762083454108",
        appId: "1:762083454108:web:793ce977584f6c11115159",
        measurementId: "G-TGB5CNB1FK"
    })
}

async function firebaseSdkCheck() {
    return new Promise(res => {
        document.addEventListener('DOMContentLoaded', function () {
            // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
            // // The Firebase SDK is initialized and available here!
            //
            // firebase.auth().onAuthStateChanged(user => { });
            // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
            // firebase.firestore().doc('/foo/bar').get().then(() => { });
            // firebase.functions().httpsCallable('yourFunction')().then(() => { });
            // firebase.messaging().requestPermission().then(() => { });
            // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
            // firebase.analytics(); // call to activate
            // firebase.analytics().logEvent('tutorial_completed');
            // firebase.performance(); // call to activate
            //
            // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

            try {
                let app = firebaseAppInit();
                let features = [
                    'auth',
                    'database',
                    'firestore',
                    'functions',
                    'messaging',
                    'storage',
                    'analytics',
                    'remoteConfig',
                    'performance',
                ].filter(feature => typeof app[feature] === 'function');
                console.log(`Firebase SDK loaded with ${features.join(', ')}`);
            } catch (e) {
                console.error(e);
                console.log('Error loading the Firebase SDK, check the console.');
            }
            finally {
                res(firebase);
            }
        });
    })
}

(async function main() {
    const firebase = await firebaseSdkCheck();

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().languageCode = 'ko';

    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });

    document.getElementById("youtube-oauth").addEventListener("click", () => {
        firebase.auth().signInWithRedirect(provider);
    })

    firebase.auth()
        .getRedirectResult()
        .then((result) => {
            if (result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                

                document.getElementById("youtube-oauth").remove();
            }
            // The signed-in user info.
            var user = result.user;
            // IdP data available in result.additionalUserInfo.profile.
            // ...

            console.log(token)
            console.log("user", result.additionalUserInfo.profile);

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
})();