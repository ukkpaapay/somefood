
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
    $("#content")[0].load("home.html");
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

  if (page.id === 'homePage') {
    $("#carousel").empty();
      db.collection("res").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {       
          var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
              <div class="thumbnail" style="background-image: url('${doc.data().url}')"></div>           
              <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
          </ons-carousel-item>`
          $("#carousel").append(item);
        });
      });
  }

  if (page.id === 'homePage') {
    console.log("homePage");

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#carousel").click(function () {
      $("#content")[0].load("resturantmenu.html");
    });

  }

  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#logout").click(function () {
      // $("#content")[0].load("register.html");
      firebase.auth().signOut().then(function () {
        console.log("logout");
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
      $("#content")[0].load("login.html");
    });

    $("#login").click(function () {
      $("#content")[0].load("login.html");
      $("#sidemenu")[0].close();
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");
      $("#sidemenu")[0].close();
    });
  }



  if (page.id === 'restureantlist') {

    $("#backbtn").click(function () {
      $("#content")[0].load("home.html");
    });
  }

  if (page.id === 'restureantmenu') {

    $("#backbtn").click(function () {
      $("#content")[0].load("home.html");
    });
  }

});



  



















