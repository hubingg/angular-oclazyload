var menuCtr=function($scope){
	$scope.menus=[
	    {txt:"目录1",sref:"menu1"},
	    {txt:"目录2",sref:"menu2"},
	];
}
menuCtr.$injector=["$scope"];
var app=angular.module("app",["ui.router","oc.lazyLoad"]);
app.controller("menuCtr",menuCtr);
//ui—route的路由配置
app.config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider",function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){
	$urlRouterProvider.otherwise('/');
    $stateProvider.state("menu1",{
        url:"/menu1",
        templateUrl:"views/menu1.html",
      	resolve:{
			deps:["$ocLazyLoad",function($ocLazyLoad){
			 	return $ocLazyLoad.load(["./controller/menuCtr1.js","./service/menu1Service.js"]);
			}]
		}
    }).state("menu2",{
        url:"/menu2",
        templateUrl:"views/menu2.html",
    })

    $ocLazyLoadProvider.config({
    modules: [{
        name: 'lazyload',
        files: [
            './controller/menuCtr2.js',
            
        ]
    }]
})
}]);

