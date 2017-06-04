var menuCtr2=function($scope){
	$scope.text="这是目录二下面的内容"
}
menuCtr2.$injector=["$scope"];
angular.module("app",[['./service/menu2Service.js']]).controller("menuCtr2",menuCtr2)
