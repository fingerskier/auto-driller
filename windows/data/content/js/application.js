angular.module('AD', [
	'AD.directives',
	'AD.filters',
	'AD.tally',
	'AD.activities',
	'AD.slideSheet',
	'AD.surveyor',
	'AD.projector'
]).config(function() {
	"$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
	$routeProvider
	.when("/:root")
	.when("/:root/:branch")
	.when("/:root/:branch/:leaf")
	.otherwise({
		redirectTo: "/"
	});
	
	$locationProvider.html5Mode(true);
	}
)
.run(function() {
	$rootScope.view = "";

	$rootScope.goto = function(URL) {
	$location.path(URL);
	}

	$rootScope.$on("$routeChangeSuccess", function(scope, next, current) {
		$rootScope.root = $routeParams.root;
		$rootScope.branch = $routeParams.branch;
		$rootScope.leaf = $routeParams.leaf;
		$rootScope.query = $location.hash();
	});
})
;