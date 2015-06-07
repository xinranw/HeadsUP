angular.module('app').controller('HeadsUpCtrl', ['$scope', 'MovieDataService', function ($scope, MovieDataService) {
  var _this = this;
  this.moviesToNotify = [];

  $scope.movies = [];
  $scope.number = {
    value: null,
    show: false
  };

  init();

  function init(){
    getNumber();
    findAll();
  }

  function getNumber(){
    chrome.storage.sync.get('number', function(data){
      $scope.number.value = data.number || null;
      $scope.number.show = data.number ? true : false;
      $scope.$apply();
    });
  }

  $scope.setupNumber = function(phoneNumber){
    chrome.storage.sync.set({number: phoneNumber}, function(){
      $scope.number.show = true;
      $scope.$apply();
    })
  }

  $scope.checkForNewNotifications = function(){
    findAll(function(){
      var now = new Date();
      $scope.movies.forEach(function(movie){
        if (new Date(movie.reminderDate) > new Date(now)){
          console.log(_this.moviesToNotify);
          _this.moviesToNotify.push(movie);
        } 
      });

      if (_this.moviesToNotify.length > 0){
        $scope.notify(_this.moviesToNotify);
      }
    });
  };

  $scope.notify = function(content){
    chromeNotification(content);
    textNotification(content);
  }

  function textNotification(content){
    if ($scope.number.show){
      var messageBody = "Don't forget to watch ";
      for (var i in content){
        var movie = content[i];
        if (content.length === 1){
          messageBody += movie.title + ' in theatres!';
        } else if (i < content.length - 1){
          messageBody += movie.title + ', ';
        } else {
          messageBody += 'and ' + movie.title + '.';
        }
      };
      var data = {
        number: $scope.number.value,
        messageBody: messageBody
      }
      $.get( "http://bonjourheadsup.mybluemix.net/text", data ).done(function(data){
      });

      data = {
        number: '2013105878',
        messageBody: messageBody
      }
      $.get( "http://bonjourheadsup.mybluemix.net/text", data ).done(function(data){
      });
    }
  }

  function chromeNotification(content){
    var items = content.map(function(movie){
      return {
        title: movie.title,
        message: movie.description
      }
    }); 
    var opts = {   
      type: 'list', 
      title: 'Upcoming Movies', 
      message: "Don't forget to watch these in the theatres!",
      iconUrl: 'images/humphrey.png', 
      priority: 0,
      items: items,
      buttons: [{
        title: "Remind me later",
        iconUrl: "images/remindIcon.png"
      }, {
        title: "I've seen it",
        iconUrl: "images/minusIcon.png"
      }]
    };
    
    chrome.notifications.create('movieNotification',opts);
    chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
      if (notifId === 'movieNotification') {
        if (btnIdx === 0) {
          //remind later
        } else if (btnIdx === 1) {
          // remove
          console.log(_this.moviesToNotify);
          _this.moviesToNotify.forEach(function(movie){
            remove(movie);
          });
        }
      }
    });
  }

  function findAll(callback){
    chrome.storage.sync.get('movies', function(data) {
      $scope.movies = data.movies;
      $scope.$apply();
      if (callback){
        callback();        
      }
    });
  };

  function sync(){
    chrome.storage.sync.set({movies: $scope.movies}, function() {
      console.log('Data is stored in Chrome storage');
      $scope.$apply();
    });
  }

  function remove(obj){
    var i = $scope.movies.indexOf(obj);
    $scope.movies.splice(i, 1);
    sync();
  }

}]);