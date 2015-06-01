(function(){
  'use strict';
  angular.module("mapYourApp.flux", [])
  .factory("Dispatcher", ["FluxUtil", function(FluxUtil){
    return FluxUtil.createDispatcher();
  }])
  .factory("Store", ["FluxUtil", "Dispatcher", function(FluxUtil, Dispatcher){
      // Define Internal Caching Here
      _currentUser = undefined;

      return FluxUtil.createStore({
        // Define Getters Here
        getUser: function(){
          return _currentUser;
        },

        dispatcherIndex: Dispatcher.register(function (payload) {
          // Define Actions to Respond to Here
          var action = payload.action;

          if (action.response === "PENDING") {
            switch (action.actionType) {
              case "SOME_ACTION_HERE":
              break;
            }
          } else if (action.response === "ERROR") {
            console.log(action.actionType);
            console.log("Error received from dispatcher");
          } else {
            switch (action.actionType) {
              case "SOME_ACTION_HERE":
              console.log(action)
              
              break;

              case "SOME_ACTION_HERE":
              console.log(action)
              
              break;
            }
          }
        })
      });
    }])
})();