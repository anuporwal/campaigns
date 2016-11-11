app.controller('homeCtrl', function($scope, $ionicPopup, $ionicLoading, $timeout){
	console.log('works');
	var users = {};
	var emails = {};
	var mobiles = {};
	var databaseUsers = {};
	$ionicLoading.show();
	db.ref('coupons').once('value', function(response){
		$timeout(function(){
			if(response.val()){
				users = response.val();
				console.log(users);
			} else if(localStorage.getItem('users') !== null){
				users = JSON.parse(localStorage.getItem('users'));
				console.log(users);
			}
			for(key in users){
				console.log(key, users[key]);
				emails[users[key].email] = key;
				mobiles[users[key].mobile] = key;
			}
			alert(JSON.stringify(emails));
			$timeout(function(){
				$ionicLoading.hide();
			},1000);
			console.log(emails, mobiles);
		},0);
	})

	$timeout(function(){
		$ionicLoading.hide();
	},5000);

	$scope.user = {};
	$scope.submit = function(){
		$ionicLoading.show();
		console.log('clicked');
		$scope.user.serialNo = Math.floor(Math.random()*90000) + 10000;
		console.log($scope.user);
		var updates = {};
		updates['coupons/'+$scope.user.serialNo] = $scope.user;
		var emailExist = false;
		var mobileExist = false;
		if(emails[$scope.user.email]){
			console.log(emails[$scope.user.email]);
			emailExist = true;
		}
		console.log(emailExist, mobileExist);
		if(mobiles[$scope.user.mobile]){
			console.log(mobiles[$scope.user.mobile]);
			mobileExist = true;
		}
		if(emailExist && mobileExist){
			$ionicLoading.hide();
			$ionicPopup.alert({
				title: 'Error',
				template: 'Already registered'
			});
		} else if(emailExist){
			$ionicLoading.hide();
			$ionicPopup.alert({
				title: 'Error',
				template: 'Email already registered'
			});
		} else if(mobileExist){
			$ionicLoading.hide();
			$ionicPopup.alert({
				title: 'Error',
				template: 'Mobile already registered'
			});
		} else {
			users[$scope.user.serialNo] = $scope.user;
			localStorage.setItem('users', JSON.stringify(users));
			db.ref().update(updates).then(function(){
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Successful',
					template: 'Serial number is '+ $scope.user.serialNo
				}).then(function(){
					window.location.reload(true);
				});
			})
		}
	}
})