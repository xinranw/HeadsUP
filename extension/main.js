require(
  { baseUrl: chrome.extension.getURL("/") },
  ["moviesData"],
  function (MoviesData) {
    // var url = window.location.href;
    // var isYoutube = url.indexOf('youtube.com') >= 0;

    // if (isYoutube){
    //   var title = getTitle();

    //   $.getJSON(chrome.extension.getURL('/data.json'), function(data) {
    //     var movies = data.movies.map(function(movie){
    //       return movie.name;       
    //     });
    //     movies.some(function(movie){
    //       if (title.indexOf(movie) >= 0){
    //         addButton();

    //         return;
    //       }
    //     });
    //   });
    // }

    // function getTitle(){
    //   var title = document.getElementsByClassName('watch-title')[0].getAttribute('title');
    //   return title;
    // }

    // function addButton(){
    //   var btn = document.createElement("button");
    //   var t = document.createTextNode("Heads up!");
    //   btn.appendChild(t);
    //   btn.classList.add('hu-button', 'btn', 'btn-primary');
    //   var titleContainer = document.getElementsByClassName('watch-title-container')[0];
    //   titleContainer.appendChild(btn);

    //   btn.addEventListener('click', function() {
    //     MoviesData.add(getTitle());
    //   }, false);
    // }
  }
  );