$(document).ready(function() {
  var _this = this;
  var url = window.location.href;
  var isYoutube = url.indexOf('youtube.com') >= 0;
  var data = [];
  var movie;

  if (isYoutube){
    youtube();
  }

  function youtube(){
    var title = getTitle().toLowerCase();
    $.getJSON(chrome.extension.getURL('/data.json'), function(data) {
      data.movies.filter(function(movie){
        if (contains(title, movie.name.toLowerCase())){
          _this.movie = movie;
          insertButton();
        }
      });
    });
  }

  function getTitle(){
    var title = document.getElementsByClassName('watch-title')[0].getAttribute('title');
    return title;
  }

  function insertButton(){
    var btn = document.createElement("button");
    var humphrey = document.createElement("img");
    humphrey.setAttribute('src', chrome.extension.getURL('/images/humphrey.png'));
    humphrey.classList.add('humphrey');
    var t = document.createTextNode("Heads up!");
    btn.appendChild(humphrey);
    btn.appendChild(t);
    btn.classList.add('hu-button', 'hu-inline-button');
    var titleContainer = document.getElementsByClassName('watch-title-container')[0];
    titleContainer.appendChild(btn);

    btn.addEventListener('click', function() {
      btn.classList.add('hu-inline-button-clicked');
      add();
    }, false);
  }

  function add(){
    fetch(function(data){
      var containsElement = false;
      for (var i in data){
        if (contains(data[i].title, _this.movie.name)){
          containsElement = true;
          break;
        }
      };
      if (!containsElement){
        var id = _this.data.length + 1;
        var newObj = {
          id: id,
          title: _this.movie.name,
          createdAt: new Date(),
          reminderDate: _this.movie.releaseDate,
          description: _this.movie.description
        };
        _this.data.push(newObj);
        console.log(_this.data);
        _this.data.sort(function(a,b){
          return new Date(b.reminderDate) - new Date(a.reminderDate);
        });
        console.log(_this.data);
        sync();
      };
    });
  }

  function fetch(callback){
    chrome.storage.sync.get('movies', function(keys) {
      _this.data = keys.movies || [];
      callback(_this.data);
    });
  }

  function sync(){
    chrome.storage.sync.set({movies: _this.data}, function() {
      console.log('Syncing with Chrome storage');
    });
  }

  function contains(a, b){
    var doesContain = a.toLowerCase().indexOf(b.toLowerCase()) === -1;
    return !doesContain;
  }
});
