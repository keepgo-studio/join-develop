const API_KEY = "AIzaSyCe4wTxCLdm581_wobRgxyY60XD6jMshBg"


function firebaseAppInit() {
    let isValid;

    try {
        const app = firebase.initializeApp({
            apiKey: API_KEY,
            authDomain: "fir-bb3d4.firebaseapp.com",
            projectId: "fir-bb3d4",
            storageBucket: "fir-bb3d4.appspot.com",
            messagingSenderId: "762083454108",
            appId: "1:762083454108:web:793ce977584f6c11115159",
            measurementId: "G-TGB5CNB1FK"
        });
    
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
        
        isValid = true;
    } catch (e) {
        console.error(e);
        console.log('Error loading the Firebase SDK, check the console.');

        isValid = false;
    }
    finally {
        return isValid;
    }
}

function removeAuth() {
    document.getElementById("youtube-oauth").remove();
}

async function authFlow() {
    const { firebase } = window;

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().languageCode = 'ko';

    provider.addScope("https://www.googleapis.com/auth/youtube.readonly");

    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });

    document.getElementById("youtube-oauth").addEventListener("click", () => {
        firebase.auth().signInWithRedirect(provider);
    })

    const returnData = {
        token: undefined,
        profile: undefined
    };

    await firebase.auth()
        .getRedirectResult()
        .then((result) => {
            if (result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                const credential = result.credential;
                returnData.token = credential.accessToken;
            }
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            alert(`${errorCode}: ${errorMessage}\nyou typed: ${email}`);
        });

        return returnData;
}

function checkStreamsIsLive() {

}

async function main() {
    const fbValid = firebaseAppInit();

    if (!fbValid) return;

    const data = await authFlow();

    if (data.token === undefined) return;

    removeAuth();
}

document.addEventListener('DOMContentLoaded', main);