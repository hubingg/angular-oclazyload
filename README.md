# angular-oclazyload
    在用angular做一些比较大的项目的时候，如果像以前一样，在首页引入一大堆js文件话，无疑会造成首次加载消耗很多的时间，对用户体验非常不好，所以按需加载就应运而生了，在需要用的时候才加载，这样很高效。有些js框架可以实现，比图RequireJS ，seaJS。是一个根据需要来加载 js文件的 JavaScript框架,可避免不必要的js文件加载,提升网页浏览速度。
    但是今天给大家介绍另外一个基于angular的插件，ocLazyLoadjs，同样可以实现按需加载。在angular中运用ocLazyLoadjs实现按需加载，可以在一下几个方面进行运用：
    ##1）在ui-route路由配置中加载
        resolve:{
    		deps:["$ocLazyLoad",function($ocLazyLoad){
			 	return $ocLazyLoad.load([所需加载的文件]);//路径一定要正确
			}]
        }
    ##2）在控制器中动态加载，需要引入$ocLazyLoad
     $ocLazyLoad.load([所需加载的文件]);
    ##3）依赖加载
    angular.module('myapp', [[
        所需加载的文件
    ]])
    ##4）在模板template中加载
    <div oc-lazy-load="lazyload"></div>
     $ocLazyLoadProvider.config({
        modules: [{
            name: 'lazyload',
            files: [
                '所需加载的文件'
            ]
        }]
    })
    
    
 下面结合一个dome,详细说说
index.html

        <!DOCTYPE html>
        <html lang="en">
        <head>
           <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" href="./lib/css/base.css">
        </head>
        <body>
        <div ng-app="app">
            <div id="top">this is head!</div>
            <div id="con" ng-controller="menuCtr">{{num}}
                <ul class="menu">
                    <li ng-repeat="menu in menus"><a ui-sref="{{menu.sref}}">{{menu.txt}}</a></li>
                </ul>
                <div ui-view=""></div>
            </div>
            <div id="bot">this is footer!</div>
        </div>
        <script src="./lib/js/angular.min.js"></script>
        <script src="./lib/js/angular-ui-router.js"></script>
        <script src="./lib/js/ocLazyLoad.js"></script>
      <script src="./main.js"></script>
        </body>
        </html>
main.js
   在main.js中配置了目录的路由，当点击目录一时，会加载目录一的内容，对应的控制器，服务文件当点击目录二的时候，会加载目录二所对应的模板，控制器，服务
基于uiRouter的resolve是在加载controller和template之前所执行的一系列操作，它帮助我们初始化我们所要前往的那一个视图。只有rsolved(操作完成)，controller才会被实例化。因此，我们可以在resolve步骤里面加载我们所需要的controller,以及需要用到的服务。
目录一对应的控制器，服务是在路由配置里面加载的
目录二对应的控制器，服务是在模板中加载的
```
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
                './service/menu2Service.js'
            ]
        }]
        })
        }]);
        
 ```
我们在目录一对应的控制中加载目录一下的子目录所对应的路由，通过在控制器中动态加载的方式
```
        var menuCtr1=function($scope,$ocLazyLoad){
      $scope.menuSon=[
          {txt:"二级目录一",sref:"menu1.menuSon1"},
          {txt:"二级目录二",sref:"menu1.menuSon2"}
      ];
      $scope.flag="fath";
       $ocLazyLoad.load([
            './route/router.js'//注意此处的路径是相对于main.js
        ]);
       $scope.$broadcast('msg', $scope.menuSon);
        }
        menuCtr1.$injector=["$scope","$ocLazyLoad"];
        angular.module("app",[]).controller("menuCtr1",menuCtr1)

```
    
