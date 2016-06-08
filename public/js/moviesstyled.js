if(document.getElementById("found-movies")){
  window.location.hash = '#hero-title';
}


// Shows or hides movie details by changing css properties
function toggleDetails(id) {
  var state = document.getElementById(id).style.display;
  console.log(state);
  if(state === "block"){
    document.getElementById(id).style.display = "none";
  } else {
    document.getElementById(id).style.display = "block";
  }
}

// Adds to stored favorites by making AJAX call to 'favorites' route
function addToFavorites(name, id) {
  var addButton = document.getElementById(id)

  // Prevents user from double adding
  if(addButton.innerHTML.trim() === "Added"){
    console.log("Movie already added!")
    addButton.style.color = "red";
  } else {

    // AJAX used XMLHttpRequest to make http calls
    var xhttp = new XMLHttpRequest();

    // Defines what to do if the AJAX call is successful.
    // Note it runs AFTER the call is made below with 'xhttp.send()'
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.getElementById(id).innerHTML = "Added";
        // addButton.style.color   = "blue";
        addButton.className += " btn btn-primary";

        // Clear out 'No Favorites Yet Text'
        if(document.getElementById("empty-favorites")){
          document.getElementById("empty-favorites").innerHTML = "";
        }

        // Append to Favorites Section
        var node = document.createElement("DIV");
        var textnode = document.createTextNode(name + " - Just Added!");
        node.appendChild(textnode);
        document.getElementById("favorites").appendChild(node);

        location.href = "#favorites"
      }
    };

    // Sets up the http method and route to call
    xhttp.open("POST", "/favorites?name=" + name + "&oid=" + id , true);

    // Actually makes AJAX call
    xhttp.send();
  }
}

// Pulls all stored favorites and appends to favorites div
function showFavorites(){
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

          // Creates a json object from stored movies
          var movies = JSON.parse(xmlhttp.responseText);
          console.log(xmlhttp.responseText);
          renderFavorites(movies);
      }
  };

  xmlhttp.open("GET", "/favorites", true);
  xmlhttp.send();

  // Loops over all movies and appends them as <li> elements to teh favorites div
  function renderFavorites(movies) {
    if(movies.length === 0){
      document.getElementById("favorites").innerHTML = "<div id='empty-favorites'>You haven't favorited any movies yet</div>";
    }else {
      // Creates list of movies
      var out = "";
      var i;
      for(i = 0; i < movies.length; i++) {
        out += '<div>' + movies[i]["name"] + '</div>'
      }
      document.getElementById("favorites").innerHTML = out;
    }
  }
}

function hideFavorites(){
  // Removed favorites from screen only
  document.getElementById("favorites").innerHTML = "";
  console.log("Clearing Favorites Div")
}


function deleteFavorites(){
  // Pops up confirm button
  if (confirm("Are you sure you want to delete all favorites?") == true) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(xmlhttp.responseText);

        // Removed favorites from screen only
        document.getElementById("favorites").innerHTML = "";
      }
    };

    // Calls delete route, lets server do the deleting from storage
    xmlhttp.open("GET", "/delete_favorites", true);
    xmlhttp.send();
  } else {
      console.log("Ok, not deleting all favorites")
  }
}
