(function() {
  
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData'];
  function profileCtrl($location, meanData) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .success(function(data) {
        alert("GOT PROFILE!");
        console.log("GOT PROFILE:");
        console.log(data);
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();