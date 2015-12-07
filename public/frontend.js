$(document).ready(function(){ 
	console.log("hi");
	$("#signup-button").click(function(){
		event.preventDefault();
		signupForm();
	});

// =======================
// User Signup
// =======================

	var signupForm = function(){
		var usernameInput = $("#inputUserName").val();
		var firstNameInput = $("#inputFirstName").val();
		var lastNameInput = $("#inputLastName").val();
		var emailInput = $("#inputEmail").val();
		var passwordInput =$("#inputPassword").val();

		var user = {
			username: usernameInput,
			first_name: firstNameInput,
			last_name: lastNameInput,
			email: emailInput,
			password: passwordInput
		};

		$.ajax({
			url: '/users',
			method: 'POST',
			dataType: 'json',
			data: user
		}).done( loggedIn);

	};

	var loggedIn = function(data){
		// what happens after user is created
		$("#signup-container").remove();
		$('#username-container').append('<h1 id="welcome-username">Welcome, ' + data.username + "!</h1>");
		
		
	}


// =======================
// Get articles
// =======================

$("#get-articles").click(function(){
	getArticles();
});

var getArticles = function(){
	$.ajax({
		url: "/users/" + Cookies.get("loggedinId"),
		method: 'GET',
		dataType: 'json',
	}).done( function(data){
		var source = $("#view-article-template").html();
		var template= Handlebars.compile(source)
		var context ={ username: data.username, articles: data.articles  };
		var html = template(context);
		$("#view-profile").append(html);
	});
};



$(document).on("click", "#saveArticle", function() {
	console.log("saving article")
	saveArticleUser();

});

var saveArticleUser = function() {

	var userData = $('.strikeTitle').text();
	console.log(userData);


}




});















// var myModule = angular.module("SignupModule", []);

// myModule.directive("ngSignup", function(){
// 	return {
// 		controllerAs: 'postUser',
// 		controller: [ '$http', function SignupCtrl( $http){
// 			this.$http = $http;
// 			var self = this;

// 			this.testing = function() {
// 				console.log('testing');
// 			}

// 			this.createUser = function(){
// 				console.log("I work");
// 				self.$http.post('/users', {   
// 					username: this.formUserUsername,
//   				first_name: this.formUserFirstName,
//   				last_name: this.formUserLastName,
//   				email: this.formUserEmail,
//   				password: this.formUserPassword
// 				}).then(function(response){
// 					self.books.push(response.data)
// 				});
// 			};
// 		}]
// 	}
// });


