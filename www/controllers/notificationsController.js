angular.module('NotificationController', [])

.controller('NotificationController', ['$scope', '$firebase', '$timeout', 'HelperService', 'BeerService', 'NotificationService', function($scope, $firebase, $timeout, HelperService, BeerService, NotificationService) {

    // get all notifications
    NotificationService.getAllNotifs()
        .then(function(notifs) {
            // if notification has beer id get beer object
            _.forEach(notifs, function(beerObj) {
                if (beerObj && beerObj.beerId) {
                    BeerService.getBeerById(beerObj.beerId)
                        .then(function(response) {
                            $timeout(function() {
                                notifs[beerObj.key].beer = response.name;
                                return notifs;
                            }, 100);
                        });
                }
            });
            console.log(notifs);
            $scope.notifications = notifs;
        });

    $scope.sortBy = function(cat) {
        if (cat === $scope.filterVar) {
            $scope.reverse = !$scope.reverse;
        }
        $scope.filterVar = cat;
    };

}])

.filter('object2Array', function() {
    return function(input) {
      var out = [];
      for(var i in input){
        // puts original key into array for using on Angular side
        input[i].key = i;
        out.push(input[i]);
      }
      return out;
    };
  });