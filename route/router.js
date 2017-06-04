angular.module("app").config(["$stateProvider",function($stateProvider){
	$stateProvider.state("menu1.menuSon1",{
        url:"/menuSon1",
        templateUrl:"views/menuSon1.html",
       resolve:{
		 deps:["$ocLazyLoad",function($ocLazyLoad){
		 return $ocLazyLoad.load("./controller/menuCtr1.js");
		}]
		}
    }).state("menu1.menuSon2",{
        url:"/menuSon2",
        template:"<h2>这是二级目录2下的内容</h2>"
    })
}]);