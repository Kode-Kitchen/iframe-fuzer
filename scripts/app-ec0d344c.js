"use strict";angular.module("iframeScaffolder",["ngSanitize","ui.router","zeroclipboard"]).config(["$stateProvider","$urlRouterProvider","$sceProvider","uiZeroclipConfigProvider",function(e,l,t,a){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}).state("view",{url:"/view?urls&layout",templateUrl:"app/view/view.html",controller:"ViewCtrl"}),l.otherwise("/"),t.enabled(!1),a.setZcConf({swfPath:"bower_components/zeroclipboard/dist/ZeroClipboard.swf"})}]),angular.module("iframeScaffolder").controller("ViewCtrl",["$scope","$stateParams",function(e,l){e.layout=l.layout,e.urls=l.urls.split(",")}]),angular.module("iframeScaffolder").controller("MainCtrl",["$scope","$state","$http",function(e,l,t){e.layout="head",e.urls=[],e.width=600,e.height=450,e.examples=[],t.get("assets/examples.json").success(function(l){e.examples=l}),e.addUrl=function(){e.newUrl&&(e.urls.push(e.newUrl),e.newUrl=null)},e.removeUrl=function(l){e.urls.splice(l,1)},e.getViewUrl=function(){var t={urls:e.urls.join(","),layout:e.layout};return l.href("view",t,{absolute:!0})},e.getViewIframe=function(){var l=e.getViewUrl(),t=e.width||600,a=e.height||450;return"<iframe src="+l+' width="'+t+'" height="'+a+'" frameborder="0" allowfullscreen></iframe>'},e.pickExample=function(){var l=e.examples[Math.floor(Math.random()*e.examples.length)];angular.extend(e,angular.copy(l))}}]),angular.module("iframeScaffolder").directive("scaffolder",function(){return{restrict:"E",controller:"ScaffolderCtrl",templateUrl:"components/scaffolder/scaffolder.html",scope:{urls:"=",layout:"="}}}),angular.module("iframeLayout").controller("ScaffolderCtrl",["$scope",function(e){e.iframeWidth=function(){switch(e.layout){case"horizontal":return 100/e.urls.length+"%";case"tail":return"50%";case"head":return"50%"}},e.iframeHeight=function(l,t,a){return"horizontal"===e.layout||"head"===e.layout&&t||"tail"===e.layout&&a?"100%":100/(e.urls.length-1)+"%"}}]),function(e){try{e=angular.module("iframeScaffolder")}catch(l){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="introduction"><div class="container"><h2>Iframe Scaffolder</h2><p class="lead text-muted">This tool helps you to quickly build a mosaic of iframes.</p></div></div><div class="container"><div class="row editor"><div class="col-md-4"><div class="panel editor__step panel-default"><div class="editor__step__label"></div><form class="panel-body" role="form" ng-submit="addUrl()"><div class="input-group"><input type="url" required="" ng-model="newUrl" class="form-control" placeholder="An URL to use as new iframe"> <span class="input-group-btn"><button class="btn btn-primary" type="submit">Add</button></span></div></form><ul class="list-group"><li class="list-group-item editor__step__url" ng-repeat="url in urls track by $index"><div class="btn-group btn-group-xs pull-right editor__step__url__actions"><button type="button" class="btn btn-default" ng-click="removeUrl($index)"><i class="glyphicon glyphicon-trash"></i></button></div><a ng-href="{{url}}" target="_blank" class="editor__step__url__value">{{url}}</a></li></ul></div><div class="panel editor__step panel-default"><div class="editor__step__label"></div><div class="panel-body"><div class="pull-left">Choose a layout<br><small class="text-muted">How iframes are arranged</small></div><div class="pull-right"><button class="btn btn-default" ng-class="{active: layout == \'horizontal\'}" ng-click="layout = \'horizontal\'">▯▯▯</button> <button class="btn btn-default" ng-class="{active: layout == \'head\'}" ng-click="layout = \'head\'">▯▤</button> <button class="btn btn-default" ng-class="{active: layout == \'tail\'}" ng-click="layout = \'tail\'">▤▯</button></div></div></div><div class="panel editor__step panel-default"><div class="editor__step__label"></div><div class="panel-body"><p><button class="btn btn-default btn-xs pull-right" ui-zeroclip="" zeroclip-model="getViewIframe()">Copy</button> Export the iframe</p><p><textarea class="form-control" readonly="">{{getViewIframe()}}</textarea></p><div class="text-muted"><div class="pull-left">Change the size&nbsp;</div><div class="text-right"><input type="number" ng-model="width" min="50" class="form-control input-sm editor__step__size"> x <input type="number" ng-model="height" min="50" class="form-control input-sm editor__step__size"></div></div></div></div><div class="text-muted small editor__credits"><div class="media"><a class="media-left media-middle" href="http://twitter.com/pirhoo" target="_blank"><img src="https://secure.gravatar.com/avatar/f514016d15f3d5409177c1031eedb0a5?s=32" class="img-circle img-thumbnail"></a><div class="media-body">Hi, I\'m <a href="http://twitter.com/pirhoo" target="_blank">@pirhoo</a>.<br>I hope you enjoy this <a href="">open source</a> tool.</div></div></div></div><div class="col-md-8"><div class="panel panel-default editor__preview"><div class="editor__preview__empty-alert" ng-hide="urls.length"><div class="lead editor__preview__empty-alert__message"><p>Add your iframe\'s URL on the <span class="hidden-sm hidden-xs">left</span>panel to preview the mosaic here.</p><p><a ng-click="pickExample()" class="btn btn-link" ng-show="examples.length">See an example.</a> {{example}}</p></div></div><div class="panel-heading"><div class="input-group"><input class="form-control" type="text" value="{{getViewUrl()}}" readonly=""> <span class="input-group-btn"><a class="btn btn-link" href="{{getViewUrl()}}" target="_blank"><i class="glyphicon glyphicon-new-window"></i></a></span></div></div><div class="editor__preview__scaffolder"><scaffolder urls="urls" layout="layout"></scaffolder></div></div></div></div></div>')}])}(),function(e){try{e=angular.module("iframeScaffolder")}catch(l){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("app/view/view.html",'<div class="view"><div class="view__scaffolder"><scaffolder urls="urls" layout="layout"></scaffolder></div></div>')}])}(),function(e){try{e=angular.module("iframeScaffolder")}catch(l){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("components/scaffolder/scaffolder.html",'<div class="scaffolder scaffolder--{{layout}}"><iframe frameborder="0" class="scaffolder__iframe" width="{{iframeWidth($index, $first, $last)}}" height="{{iframeHeight($index, $first, $last)}}" ng-src="{{url}}" ng-repeat="url in urls track by $index"></iframe></div>')}])}();