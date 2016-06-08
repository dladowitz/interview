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
    addButton.innerHTML = "You Already Added This Movie";
  } else if(addButton.innerHTML === "You Already Added This Movie") {
    addButton.style.background   = "red";
  } else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.getElementById(id).innerHTML = "Added";
        console.log(xhttp.responseText);
      }
    };
    xhttp.open("GET", "/favorites?name=" + name + "&oid=" + id , true);
    xhttp.send();
  }
}

function getFavorites(){
  var xmlhttp = new XMLHttpRequest();
  var url = "/get_favorites";

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var movies = JSON.parse(xmlhttp.responseText);
          console.log(movies);
          renderFavorites(movies);
      }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function renderFavorites(movies) {
      var out = "";
      var i;
      for(i = 0; i < movies.length; i++) {
          out += '<li>' + movies[i]["name"] + '</li>'
      }
      document.getElementById("favorites").innerHTML = out;
  }
}
