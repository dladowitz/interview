// alert("Hello World")
// document.getElementById("MyElement").className = "MyClass";
// document.getElementByClass("movie-details").style.display = "show";

function toggleDetails(title) {
  console.log(title)

  var state = document.getElementById(title).style.display;

  if(state === "block"){
    document.getElementById(title).style.display = "none";
  } else {
    document.getElementById(title).style.display = "block";
  }
}

function addToFavorites(params) {
  console.log(params)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // document.getElementById("demo").innerHTML = xhttp.responseText;
      console.log(xhttp.responseText);
    }
  };
  xhttp.open("GET", "/favorites?" + params, true);
  xhttp.send();
}
