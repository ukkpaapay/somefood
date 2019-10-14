var signin = function(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username != "ukkpaapay" && password != "55659900"){

    }else{
        window.location.replace("foodcategory.html");
    }
}


  // Your web app's Firebase configuration
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();
