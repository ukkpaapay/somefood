
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

function selectmenu(resid) {
  id = resid;
  console.log(id);
  localStorage.setItem("selectedRestId", id)
  $("#content")[0].load("resturantlist.html");
  

}

var it = [];
var pr = [];
var itpr = parseInt(0);
function order(item, price) {
  ons.notification.alert("Add to card !");
  it.push(item);
  pr.push(price);
  itpr += parseInt(price);
  it.forEach(element => {
    console.log(element);
  });

}

document.addEventListener('init', function (event) {
  var page = event.target;
  console.log("now at:", page.id);

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

    $("#register").click(function () {
      $("#content")[0].load("register.html");
    });

  }

  if (page.id == 'register') {
    $('#SignUp').click(function () {
      var email = document.getElementById('EmailAddress').value;
      var password = document.getElementById('Password').value;
      //var fullname = document.getElementById('fullnamesignup').value;
      //var phone = document.getElementById('phonenumbersignup').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
    });
  }

  if (page.id === 'homePage') {
    $("#carousel").empty();
    db.collection("res").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" onclick="selectmenu('${doc.id}')" class="recomended_item">
              <div  class="thumbnail" style="background-image: url('${doc.data().url}')"></div>           
              <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
          </ons-carousel-item>`
        $("#carousel").append(item);
      });
    });


    $("#ffbtn").click(function () {
      localStorage.setItem("selectedCategory", "res");
      $("#content")[0].load("resturantlist.html");
    });

    $("#drinkbtn").click(function () {
      localStorage.setItem("selectedCategory", "drink");
      $("#content")[0].load("resturantlist.html");
    });

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#carousel").click(function () {
      $("#content")[0].load("resturantmenu.html");
    });

  }

  if (page.id === 'restureantlist') {
    var category = localStorage.getItem("selectedCategory");


    $("#list").empty();
    db.collection(category).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var item = `
         
          <ons-card>
        <ons-row >
                    <img src="${doc.data().url}" height="100" width="100">
                <ons-col style="margin-left:5% "><p>${doc.data().name}</p></ons-col-8>

                <ons-col  align="right"><ons-button style="background-color: gray;" onclick="selectmenu('${doc.id}')">Menu</ons-button></ons-col-4>
            </ons-row>
    </ons-card>
         
         `
          $("#list").append(item);


        });
      });

    $("#list").click(function () {
      $("#content")[0].load("resturantmenu.html");
    });

    $("#backbtn").click(function () {
      $("#content")[0].load("home.html");
    });

  }

  if (page.id === 'menuPage') {


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

    $("#Cart").click(function () {
      $("#content")[0].load("orderconfirmation.html");
      $("#sidemenu")[0].close();
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");
      $("#sidemenu")[0].close();
    });
  }

  if (page.id === 'restureantmenu') {
    var catagorymenu = localStorage.getItem("selectedCategory");
    var selectedRestId = localStorage.getItem("selectedRestId");
    $("#foods").empty();
    $("#photo").empty();
    var docRef = db.collection(catagorymenu).doc(selectedRestId);
    var photo =
    docRef.get().then(function (doc) {
      if (doc.exists) {
        var photo = `<ons-row ><img class ="img" src="${doc.data().url}" style="width: 50% ;" class="center"></img><ons-col  align="right"><h3 style="color: green;">open</h3></ons-col-4>
        </ons-row>`
        doc.data().menu.forEach(item => {
          var item = ` <ons-card style="background-color:${doc.data().color};"  onclick="order('${item.name}','${item.price}')">
          
      <ons-row >
          <ons-col ><h3>${item.name}</h3></ons-col-8>

          <ons-col  align="right">${item.price} baht</ons-col-4>
      </ons-row>
  </ons-card>`
          $("#foods").append(item);
        });
        $("#photo").append(photo);

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });


    $("#back").click(function () {
      $("#content")[0].load("home.html");
    });

  }

  if (page.id === 'orderconfirmation') {
    for (var i = 0; i < it.length; i++) {
      var item = `
      <ons-list-item>
      <div class="left">${it[i]}</div>
      <div class="right">${pr[i]}</div>
      </ons-list-item>`
      $("#food").append(item);
    }
    $("#Total").append(itpr);
    $(function () {
      $("#back").click(function () {
        $("#content")[0].load("home.html");
      });
    })

    $("#cfbtn").click(function () {
      
      if(pr == parseInt(0)){
        ons.notification.alert("No menu !");
      }else{
        ons.notification.alert("Order sucess !");
      pr = parseInt(0);
      it = parseInt(0);
      it = [];
      pr = [];
      $("#content")[0].load("home.html");
    
    }
    });
    
    $("#cfbtn1").click(function () {
      
      if(pr == parseInt(0)){
        ons.notification.alert("No menu !");
      }else{
        ons.notification.alert("Order sucess !");
      pr = parseInt(0);
      it = parseInt(0);
      it = [];
      pr = [];
      $("#content")[0].load("home.html");
    
    }
    });

    $("#cfbtn3").click(function () {
      
      $("#content")[0].load("address.html");
    
    
    });

    $("#cfbtn2").click(function () {
      
      if(pr == parseInt(0)){
        ons.notification.alert("No menu !");
      }else{
        ons.notification.alert("Order sucess !");
      pr = parseInt(0);
      it = parseInt(0);
      it = [];
      pr = [];
      $("#content")[0].load("home.html");
    
    }
    });

  }
<<<<<<< HEAD
  if (page.id === 'address') {
    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });
    var Lat;
    var Long;
    var selectedLat;
    var selectedLong;
var onSuccess = function(position) {
  Lat = position.coords.latitude;
  Long = position.coords.longitude;


  mapboxgl.accessToken = 'pk.eyJ1IjoidWtrcGFhcGF5IiwiYSI6ImNrMmxkZHZudTA1ejYzbm4zNGQ4am1reTYifQ.jplxg5e1HfLDYOa55I4aZg';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: [Long,Lat], // starting position [lng, lat]
zoom: 14 // starting zoom
});
  // alert('Latitude: '          + position.coords.latitude          + '\n' +
  //       'Longitude: '         + position.coords.longitude         + '\n' +
  //       'Altitude: '          + position.coords.altitude          + '\n' +
  //       'Accuracy: '          + position.coords.accuracy          + '\n' +
  //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
  //       'Heading: '           + position.coords.heading           + '\n' +
  //       'Speed: '             + position.coords.speed             + '\n' +
  //       'Timestamp: '         + position.timestamp                + '\n');
  var marker = new mapboxgl.Marker({
    draggable: true
  })
    .setLngLat([Long, Lat])
    .addTo(map);
  onDragEnd();
  function onDragEnd() {
    var lngLat = marker.getLngLat();
    selectedLat = lngLat.lat;
    selectedLong = lngLat.lng;

    coordinates.style.display = 'block';
    coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
  }

  marker.on('dragend', onDragEnd);

};


    

// onError Callback receives a PositionError object
//
function onError(error) {
  alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

  }
=======
>>>>>>> parent of a6a8cc0... maker
});























