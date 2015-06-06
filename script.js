$(document).ready(function() {
  var _this = this;
  var url = window.location.href;
  var isYoutube = url.indexOf('youtube.com') >= 0;
  var data = [];

  if (isYoutube){
    var title = getTitle().toLowerCase();

    $.getJSON(chrome.extension.getURL('/data.json'), function(data) {
      var movies = data.movies.map(function(movie){
        return movie.name;       
      });

      movies.some(function(movie){
        if (title.indexOf(movie.toLowerCase()) !== -1){

          insertButton(movie);

          return;
        }
      })
    });
  }

  function getTitle(){
    var title = document.getElementsByClassName('watch-title')[0].getAttribute('title');
    return title;
  }

  function insertButton(movieTitle){
    var btn = document.createElement("button");
    var t = document.createTextNode("Heads up!");
    btn.appendChild(t);
    btn.classList.add('hu-button', 'btn', 'btn-primary');
    var titleContainer = document.getElementsByClassName('watch-title-container')[0];
    titleContainer.appendChild(btn);

    btn.addEventListener('click', function() {
      add(movieTitle);

    }, false);
  }

  function add(newContent){
    fetch(function(){
      if (data.indexOf(newContent)===-1) {
        var id = _this.data.length + 1;
        var newObj = {
          id: id,
          title: newContent,
          createdAt: new Date()
        };
        _this.data.push(newObj);
        sync();
      };
    });
  }

  function fetch(callback){
    chrome.storage.sync.get('movies', function(keys) {
      _this.data = keys.movies || [];
      callback();
    });
  }

  function sync(){
    chrome.storage.sync.set({movies: _this.data}, function() {
      console.log('Data is stored in Chrome storage');
    });
  }
});
