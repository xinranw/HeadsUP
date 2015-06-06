$(document).ready(function() {
  var btn = document.createElement("button");
  var t = document.createTextNode("Heads up!");
  btn.appendChild(t);
  btn.classList.add('hu-button');
  //Appending to DOM 
  // document.body.appendChild(btn);
  // console.log('here');
  var watchHeader = document.getElementById('watch-header');
  watchHeader.appendChild(btn);
  
  btn.addEventListener('click', function() {
    alert('added');
  }, false);


});