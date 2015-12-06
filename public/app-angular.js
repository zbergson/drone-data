var myModule = angular.module("SignupModule", []);

myModule.directive("ngSignup", function(){
	return {
		controllerAs: 'postUser',
		controller: [ '$http', function SignupCtrl( $http){
			this.$http = $http;
			var thisContext = this;
			this.createUser = function(){
				console.log("I work");
				this.$http.post('/users', {   
					username: this.formUserUsername,
  				first_name: this.formUserFirstName,
  				last_name: this.formUserLastName,
  				email: this.formUserEmail,
  				password: this.formUserPassword
				}).then(function(response){
					console.log(response);
				});
			};
		}]
	}
});

