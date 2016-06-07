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
