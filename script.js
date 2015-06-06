$(document).ready(function() {
  var btn = document.createElement("button");
  var t = document.createTextNode("Heads up!");
  btn.appendChild(t);
  btn.classList.add('hu-button', 'btn', 'btn-primary');
  //Appending to DOM 
  // document.body.appendChild(btn);
  // console.log('here');
  var titleContainer = document.getElementsByClassName('watch-title-container')[0];
  titleContainer.appendChild(btn);
  
  btn.addEventListener('click', function() {
    alert('added');
  }, false);


});