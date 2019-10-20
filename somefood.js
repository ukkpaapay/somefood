
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
          var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
              <div class="thumbnail" style="background-image: url('${doc.data().url}')"></div>           
              <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
          </ons-carousel-item>`
          $("#carousel").append(item);
        });
      });
  

  $("#ffbtn").click(function () {
    localStorage.setItem("selectedCategory", "fastfood");
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
    console.log("categoryPage:" + category);

    $("#list").empty();
    db.collection("res").where("category", "==", category).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-row class="category">
                <ons-col modifier="nodivider">
                    <div class="category_header" style="background-image: url('${doc.data().url}')">
                        <figure class="category_thumbnail" id="menu">
                            <div class="category_title" id="Category_1_name">${doc.data().name}</div>
                        </figure>
                    </div>
                </ons-col>
         </ons-row>`
        $("#list").append(item);
        console.log(doc.data().name);
        
      });
    });

    $("#list").empty();
    db.collection("drink").where("category", "==", category).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-row class="category">
                <ons-col modifier="nodivider">
                    <div class="category_header" style="background-image: url('${doc.data().url}')">
                        <figure class="category_thumbnail" id="menu">
                            <div class="category_title" id="Category_1_name">${doc.data().name}</div>
                        </figure>
                    </div>
                </ons-col>
         </ons-row>`
        $("#list").append(item);
        console.log(doc.data().name);
        
      });
    });

    $("#list").click(function () {
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

  if (page.id === 'restureantmenu') {
     
        var id = page.data.id
        console.log(resId);
        var rest = db.collection("res").doc(id);

        rest.get().then(function (doc) {
            if (doc.exists) {
                $("#foods").empty()

                console.log("Document data:", doc.data());
                var restaurant = doc.data();
                var menulist = restaurant.menu;
                $("#respic").attr('src', photoUrl)
                for (var i = 0; i < menulist.length; i++) {
                    var ons_foods = ""
                    var cate = menulist[i];
                    var foods = cate.foodmenus;
                    for (var j = 0; j < foods.length; j++) {
                        var food = foods[j];
                        var foodname = food.name;
                        var foodprice = food.price;
                        ons_foods += `
                        <ons-list-item style="background-color: orange">
                            ${foodname}<br>> ${foodprice} ฿
                            <p class="right" onclick="buy(${foodprice}, '${foodname}')">
                                <ons-button>
                                    +
                                </ons-button>
                            </p>
                        </ons-list-item>
                    `
                    }
                    var ons_list = `<ons-list >
                    <ons-list-item expandable>
                        <h1>
                            
                        </h1><div class="expandable-content">
                        ${ons_foods}</div>
                    </ons-list-item>
                </ons-list>`
                    $("#foods").append(ons_list);
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    
  }

});



  



















