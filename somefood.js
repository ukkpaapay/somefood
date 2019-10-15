
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

    });

    $("#register").click(function () {
      // $("#content")[0].load("register.html");
      firebase.auth().signOut().then(function () {
        console.log("logout");
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
    });

    $("#googlelogin").click(function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
        
        // ...
      });

    });

  }
});

if (page.id === 'foodcategory') {
  db.collection("recommended").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      //object
      console.log(`${doc.id} => ${doc.data()}`);
      // each
      console.log("name : " + doc.data().name);
      console.log("id : " + doc.data().id);
      var carousel = `<ons-carousel-item modifier="nodivider" id="item1" class="recomended_item">
              <div class="thumbnail" style="background-image: url( ${doc.data().photourl} )">
              </div>
              <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
              </ons-carousel-item>`;
      $('#carousel').append(carousel);
      //` ` for ต่อ string
  
    });
  });
}


  


















