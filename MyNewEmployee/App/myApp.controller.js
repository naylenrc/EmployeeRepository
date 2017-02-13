var myAppModule = angular.module('myApp', ['angularSpinner']);

myAppModule.controller('myController',['$scope', 'usSpinnerService', 'employee', '$http', function ($scope, usSpinnerService, employee, $http) {
    usSpinnerService.spin('spinner-1');
    employee.getEmployees().then(function (request) {
    $scope.employees = request.data;
    usSpinnerService.stop('spinner-1');
    });

    $scope.editText = function () {
        $scope.titleText = "New Employee";
        $scope.showDeleteBtn = false;
        $scope.employeesToEdit = {};
    }

    $scope.edit = function (id) {
        $scope.titleText = "Edit Employee";
        $scope.showDeleteBtn = true;
        employee.getEmployeesById(id).then(function (request) {
            $scope.employeesToEdit = request.data;
        });
    }
    
    $scope.deleteEmp = function (id) {
        employee.deleteEmployee(id).then(function (response) {
            console.log('deleted');
            $scope.employees = response.data;
        });
        
    }
    
    $scope.save = function (myemployee) {
        if ($scope.titleText == "Edit Employee") {
            employee.editEmployee(myemployee)
                .then(function (response) {
                        console.log('saved');
                        $scope.employees = response.data;
                    });
        } else if ($scope.titleText == "New Employee") {
            employee.insertEmployee(myemployee)
                    .then(function (response) {
                        console.log('saved');
                        $scope.employees = response.data;
                    });
        }

        angular.element('#myModal').modal('hide');
    }

}]);

