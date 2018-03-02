'use strict';
angular.module('app').config(['$provide', function($provide){
  $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
  	//把angular的post请求改为get请求在发送
    $delegate.post = function(url, data, config) {
      var def = $q.defer();
      $delegate.get(url).success(function(resp) {
        def.resolve(resp);
      }).error(function(err) {
        def.reject(err);
      });
      return {
        success: function(cb){
          def.promise.then(cb);
        },
        error: function(cb) {
          def.promise.then(null, cb);
        }
      }
    }
    return $delegate;
  }]);
}]);
