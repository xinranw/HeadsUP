(function(){
  var MoviesData = function(){
    var _this = this;
    var data = [];

    function findAll(callback) {
      chrome.storage.sync.get('movies', function(keys) {
        _this.data = keys.data || [];
        callback(_this.data);
        // if (keys.movies != null) {
        //   _this.data = keys.movies;
        //   for (var i=0; i<_this.data.length; i++) {
        //     _this.data[i]['id'] = i + 1;
        //   }
        //   console.log(_this.data);
        //   callback(_this.data);
        // }
      });
    };

    function add(newContent){
      var id = _this.data.length + 1;
      var newObj = {
        id: id,
        content: newContent,
        createdAt: new Date()
      };
      _this.movies.push(newObj);

      sync();
    }

    function sync(){
      chrome.storage.sync.set({movies: _this.data}, function() {
        console.log('Data is stored in Chrome storage');
      });
    }

    return {
      findAll : findAll,
      add : add,
      sync: sync
    }
  }

  return MoviesData;
})();