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