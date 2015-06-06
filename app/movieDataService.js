angular.module('app').service('MovieDataService', [function () {
  var _this = this;
  this.data = [];

  this.findAll = function(callback) {
    chrome.storage.sync.get('movies', function(data) {
      _this.data = data.movies || [];
      callback(_this.data);
    });
  };

  this.sync = function() {
    chrome.storage.sync.set({movies: this.data}, function() {
      console.log('Data is stored in Chrome storage');
    });
  };

  this.add = function (content) {
    var id = this.data.length + 1;
    var newObj = {
      id: id,
      content: newContent,
      createdAt: new Date()
    };
    this.data.push(newObj);
    this.sync();
  };

  // this.remove = function(todo) {
  //   this.data.splice(this.data.indexOf(todo), 1);
  //   this.sync();
  // };

  this.removeAll = function() {
    this.data = [];
    this.sync();
  };

}]);
