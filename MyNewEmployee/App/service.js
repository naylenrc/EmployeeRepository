angular.module('myApp').service('employee', function ($http) {
    this.getEmployees = function () {
        return $http.get("/api/Employee");
    }
    this.getEmployeesById = function (id) {
        return $http.get("/api/Employee/" + id);
    }
    this.deleteEmployee = function (id) {
        return $http.delete("api/Employee/" + id);
    }
    this.insertEmployee = function (myemployee) {
        return $http.post("api/Employee/", myemployee);
    }
    this.editEmployee = function (myemployee) {
        return $http.put("api/Employee/", myemployee);
    }

});