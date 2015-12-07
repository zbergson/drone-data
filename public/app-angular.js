var myModule = angular.module("SignupModule", []);

myModule.directive("ngSignup", function(){
	return {
		controllerAs: 'postUser',
		controller: [ '$http', function SignupCtrl( $http){
			this.$http = $http;
			var self = this;

			this.testing = function() {
				console.log('testing');
			}

			this.createUser = function(){
				console.log("I work");
				self.$http.post('/users', {   
					username: this.formUserUsername,
  				first_name: this.formUserFirstName,
  				last_name: this.formUserLastName,
  				email: this.formUserEmail,
  				password: this.formUserPassword
				}).then(function(response){
					self.books.push(response.data)
				});
			};
		}]
	}
});


