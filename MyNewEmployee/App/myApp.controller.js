var myAppModule = angular.module('myApp', ['angularSpinner']);

myAppModule.controller('myController',['$scope', 'usSpinnerService', 'employee', '$http', function ($scope, usSpinnerService, employee, $http) {
    //added the usSpinnerService to the controller 
    usSpinnerService.spin('spinner-1');
    employee.getEmployees().then(function (request) {
    $scope.employees = request.data;
    usSpinnerService.stop('spinner-1');
    });


 /*   $scope.showLoader = true;
    $http.get('http://www.testurl.com/index.php/site/getprofileLocations').success(function (data) {
        $scope.showLoader = false;
        // rest of your code
    });*/

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

    $scope.save = function (employee) {
        if ($scope.titleText == "Edit Employee") {
            $http.put("/api/Employee", employee)
                    .then(function (response) {
                        console.log('saved');
                        $scope.employees = response.data;
                    });
        } else if ($scope.titleText == "New Employee") {
           
                $http.post("/api/Employee", employee)
                        .then(function (response) {
                            console.log('saved');
                            $scope.employees = response.data;
                        });
            }
        
        angular.element('#myModal').modal('hide');
    }

   /* $scope.delete = function (employee) {
        $http.delete("api/Employee/", employee)
                .then(function (response) {
                    console.log('deleted');
                })
    }*/
}]);



// que es dependency injection
myAppModule.service('employee', function ($http) {
    this.getEmployees = function () {
        return $http.get("/api/Employee");
    }
    this.getEmployeesById = function (id) {
        return $http.get("/api/Employee/" + id);
    }
    this.deleteEmployee = function (id) {
        return $http.delete("api/Employee/" + id);
    }
    
});