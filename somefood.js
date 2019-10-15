
var firebaseConfig = {
  apiKey: "AIzaSyCMEn-5Gdqf7-HJTtwY_Hgf2GoIN8jGvX4",
  authDomain: "somefood-f12c4.firebaseapp.com",
  databaseURL: "https://somefood-f12c4.firebaseio.com",
  projectId: "somefood-f12c4",
  storageBucket: "somefood-f12c4.appspot.com",
  messagingSenderId: "64010995887",
  appId: "1:64010995887:web:e9ec8907117862d7772c5a",
  measurementId: "G-ZM248P04ES"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();



document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'loginPage') {

    $("#signin").click(function () {
      var username = $("#username").val();
      var password = $("#password").val();
      firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log(`${email} User is signed in.`);
          $("#content")[0].load("foodcategory.html");
          // ...
        } else {
          // User is signed out.
          // ...
          console.log("User is signed out.");
          
        }
      });
    });
  }
});
















