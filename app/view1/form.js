(function(){
  angular.module("mapYourApp.view1")
  .directive("discoveryForm", ["$parse", function($parse){
    return {
      replace: "true",
      scope: {
        "userType": "=",
      },
      templateUrl: 'view1/form.html',
      controller: 'FormCtrl',
      controllerAs: 'vm',
      bindToController: true,
      link: function(scope, element, attributes, controller){
        var next = $parse("vm.next")(scope)

        var enterHandler = function(event){
          console.log("Enter key pressed")
          next();
          var questionIndex = scope.vm.data.currentQuestion
          var question = scope.vm.questions[questionIndex]
          scope.$digest()
          document.getElementById(question.fieldName).focus()
        }

        var keypressHandler = function(event){
          var editedEvent = {};
          editedEvent.char = event.char || event.charCode

          switch (editedEvent.char){
            case 13:
            enterHandler(editedEvent)
          }
        }

        element.on("keypress", keypressHandler)
      },
    }
  }])
  .controller("FormCtrl", [function(){
    var vm = this;
    var formValid = true
    vm.data = {
      currentQuestion: 0,
    }
    vm.questions = [
    {
      question: "What do we call you, stranger?",
      fieldName: "name",
      placeholder: "Full Name"
    },
    {
      question: "Where can we reach you?",
      fieldName: "email",
      placeholder: "email",
    },
    {
      question: "Give us your digits too?",
      fieldName: "phoneNumber",
      placeholder: "Phonenumber",
      optional: true,
    },
    {
      question: "What category is your app?",
      fieldName: "appCategory",
      placeholder: "Health/Fitness",
      optional: true,
    },
    ]
    vm.submitForm = function(){
      if(formValid && vm.data.currentQuestion === vm.questions.length-1){
        console.log("SUBMITFORM")
      } else if(vm.data.currentQuestion < vm.questions.length-1){
        vm.next()
      }
    }
    vm.next = function(){
      vm.data.currentQuestion = Math.min(vm.questions.length-1, (vm.data.currentQuestion + 1))
      console.log(vm.data.currentQuestion)
    }
    vm.previous = function(){
      vm.data.currentQuestion = Math.max(vm.data.currentQuestion - 1, 0)
    }
    console.log("YEAH I'M FUCKING SORRY!")
  }])
})();