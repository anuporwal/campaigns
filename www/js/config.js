app.config(function($stateProvider, $urlRouterProvider) {
   //State for login
   $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
   });

   // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('/home');
});
