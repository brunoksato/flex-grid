"use strict";

/**
* flex.core Module
*
* Description
*/
angular.module('flex.core', []);
"use strict";

/**
* flex.grid Module
*
* Description
*/
angular.module('flex.grid', ['flex.core','flex.tpl'])
	.directive('flexGrid', flexGrid);

/**
* @ngInject
*/
function flexGrid($templateCache, $document) {
		
	return{
		restrict: 'E',
		$scope: {
			option: "=bind"
		},
		template: $templateCache.get('grid2.html'),
		link: function ($scope, $element, $attr) {

		    $scope.index = "";
	        $scope.tableRowExpanded = false;
	        $scope.tableRowIndexExpandedCurr = "";
	        $scope.tableRowIndexExpandedPrev = "";

	        $scope.dataCollapseFn = function () {
	            $scope.dayDataCollapse = [];
	            for (var i = 0; i < $scope.option.data.length; i += 1) {
	                $scope.dayDataCollapse.push(false);
	            }
	        };

	        $scope.selectTableRow = function (index) {
	            $scope.index = $scope.option.data.indexOf(index);
	            if (typeof $scope.dayDataCollapse === 'undefined') {
	                $scope.dataCollapseFn();
	            }

	            if ($scope.tableRowExpanded === false && $scope.tableRowIndexExpandedCurr === "") {
	                $scope.tableRowIndexExpandedPrev = "";
	                $scope.tableRowExpanded = true;
	                $scope.tableRowIndexExpandedCurr = $scope.index;
	                $scope.dayDataCollapse[$scope.index] = true;
	                $document.querySelectorAll('.plus > i')[$scope.index].removeAttribute('class');
	                $document.querySelectorAll('.plus > i')[$scope.index].setAttribute('class', 'fa fa-level-down');
	            } else if ($scope.tableRowExpanded === true) {
	                if ($scope.tableRowIndexExpandedCurr === $scope.index) {
	                    $document.querySelectorAll('.plus > i')[$scope.index].removeAttribute('class');
	                    $document.querySelectorAll('.plus > i')[$scope.index].setAttribute('class', 'fa fa-plus');
	                    $scope.tableRowExpanded = false;
	                    $scope.tableRowIndexExpandedCurr = "";
	                    $scope.dayDataCollapse[$scope.index] = false;
	                } else {
	                    $document.querySelectorAll('.plus > i')[$scope.indexold].removeAttribute('class');
	                    $document.querySelectorAll('.plus > i')[$scope.indexold].setAttribute('class', 'fa fa-plus');
	                    $scope.tableRowIndexExpandedPrev = $scope.tableRowIndexExpandedCurr;
	                    $scope.tableRowIndexExpandedCurr = $scope.index;
	                    $scope.dayDataCollapse[$scope.tableRowIndexExpandedPrev] = false;
	                    $scope.dayDataCollapse[$scope.tableRowIndexExpandedCurr] = true;
	                    $document.querySelectorAll('.plus > i')[$scope.index].removeAttribute('class');
	                    $document.querySelectorAll('.plus > i')[$scope.index].setAttribute('class', 'fa fa-level-down');
	                }
	            }
	            $scope.indexold = $scope.index;
	        };

			 $scope.sort = function(column){
			 	if (column.sortable){
			 		$scope.option.data = _.map(_.sortBy($scope.option.data, column.predicate));
			 		column.sortable = false;
			 	}
			 	else{
			 		$scope.option.data = _.map(_.sortBy($scope.option.data, column.predicate).reverse());
			 		column.sortable = true;
			 	}
			 };

		}

	};

}

flexGrid.$inject = ['$templateCache', '$document'];
"use strict";

/**
* flex.tpl Module
*
* Description
*/
angular.module('flex.tpl', [])
	.run(template);

/**
* @ngInject
*/
function template ($templateCache) {

		$templateCache.put('flexGrid.html', [
			'<table class="table table-hover">',
				'<thead>',
					'<tr>',
						'<th ng-repeat="(key,value) in option.columns" ng-click="sort(value)">',
							'<strong>{{value.text}}</strong>',
						'<th>',
					'<tr>',
				'</thead>',
				'<tbody>',
					'<tr ng-repeat="data in option.data">',
						'<td ng-repeat="col in option.columns">{{data[col.predicate]}}</td>',
					'</tr>',
				'</tbody>',
			'</table>'
		].join(''));

		$templateCache.put('flexSubGrid.html', [
			'<table class="table table-hover">',
				'<thead>',
					'<tr>',
						'<th ng-repeat="(key,value) in option.columns" ng-click="sort(value)">',
							'<strong>{{value.text}}</strong>',
						'<th>',
					'<tr>',
				'</thead>',
				'<tbody ng-repeat="data in option.data" ng-switch on="dayDataCollapse[$index]">',
					'<tr ng-click="selectTableRow(data)" style="cursor:pointer;">',
						'<td class="plus" style="text-align:center; width:50px;">',
							'<i class="fa fa-plus" style="font-size:20px; color: #F39C12;"></i>',
						'</td>',
						'<td ng-repeat="col in option.columns">{{data[col.predicate]}}</td>',
					'</tr>',
					'<tr ng-switch-when="true">',
						'<td colspan="9" style="padding-left:30px;">',
							'<div class="span9">',
								'<table class="table table-striped table-bordered">',
									'<thead>',
										'<th ng-repeat="(key,value) in option.subColumns" ng-click="subSort(value)">',
											'<strong>{{value.text}}</strong>',
										'<th>',
									'</thead>',
									'<tr ng-repeat="itens in option.data[index].item">',
										'<td ng-repeat="col in option.columns">{{itens[col.predicate]}}</td>',
									'</tr>',
								'</table>',
							'</div>',
						'</td>',
					'</tr>',
				'</tbody>',
			'</table>'
		].join(''));
}

template.$inject= ['$templateCache'];