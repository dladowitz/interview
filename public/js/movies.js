// alert("Hello World")
// document.getElementById("MyElement").className = "MyClass";
// document.getElementByClass("movie-details").style.display = "show";

function toggleDetails(title) {
  // console.log(title)

  var state = document.getElementById(title).style.display;

  if(state === "block"){
    document.getElementById(title).style.display = "none";
  } else {
    document.getElementById(title).style.display = "block";
  }
}

function addToFavorites(name, id) {
  // console.log(name)
  // var name = name.replace(/ /g, "%20")
  var addButton = document.getElementById(id)

  if(addButton.innerHTML.trim() === "Added"){
    console.log("Movie already added!")
    addButton.style.color = "red";
  } else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.getElementById(id).innerHTML = "Added";
        addButton.style.color   = "blue";

        // Clear out 'No Favorites Yet Text'
        if(document.getElementById("empty-favorites")){
          document.getElementById("empty-favorites").innerHTML = "";
        }

        // Append to Favorites Section
        var node = document.createElement("LI");
        var textnode = document.createTextNode(name + " - Just Added!");
        node.appendChild(textnode);
        document.getElementById("favorites").appendChild(node);
      }
    };
    xhttp.open("POST", "/favorites?name=" + name + "&oid=" + id , true);
    xhttp.send();
  }
}

function showFavorites(){
  var xmlhttp = new XMLHttpRequest();
  var url = "/favorites";

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var movies = JSON.parse(xmlhttp.responseText);
          console.log(xmlhttp.responseText);
          renderFavorites(movies);
      }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function renderFavorites(movies) {
    if(movies.length === 0){
      document.getElementById("favorites").innerHTML = "<div id='empty-favorites'>You haven't favorited any movies yet</div>";
    }else {
      var out = "";
      var i;
      for(i = 0; i < movies.length; i++) {
        out += '<li>' + movies[i]["name"] + '</li>'
      }
      document.getElementById("favorites").innerHTML = out;
    }
  }
}

function hideFavorites(){
  document.getElementById("favorites").innerHTML = "";
  console.log("Clearing Favorites Div")
}

function deleteFavorites(){
  if (confirm("Are you sure you want to delete all favorites?") == true) {
    var xmlhttp = new XMLHttpRequest();
    var url = "/delete_favorites";

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(xmlhttp.responseText);
        document.getElementById("favorites").innerHTML = "";
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  } else {
      console.log("Ok, not deleting all favorites")
  }
}
