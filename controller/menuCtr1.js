var menuCtr1=function($scope,$ocLazyLoad,menu1Service){
	$scope.menuSon=[
	    {txt:"二级目录一",sref:"menu1.menuSon1"},
	    {txt:"二级目录二",sref:"menu1.menuSon2"}
	];
	 $ocLazyLoad.load([
        './route/router.js'//注意此处的路径是相对于main.js
    ]);
}
menuCtr1.$injector=["$scope","$ocLazyLoad","menu1Service"];
angular.module("app",[]).controller("menuCtr1",menuCtr1)


