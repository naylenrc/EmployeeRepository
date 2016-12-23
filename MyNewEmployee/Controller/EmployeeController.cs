using MyNewEmployee.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyNewEmployee.Controller
{
    public class EmployeeController : ApiController
    {
        public List<Employee> employees = new List<Employee>()
        {
            new Employee () {employeeId = 0, firstName = "Naylen", lastName = "Ramirez", initials = "NR", officeId = "New York"},
            new Employee () {employeeId = 1, firstName = "Jose", lastName = "Mendez", initials = "JM", officeId = "London"}

        };

        public List<Office> offices = new List<Office>()
        {
            new Office () {id = 1, name = "New York"},
            new Office () {id = 2, name = "London"}
        };


        // GET: api/Employee
        public EmployeeOffice Get()
        {
            var ret = new EmployeeOffice();
            ret.employees = employees;
            ret.offices = offices;

            return ret;
        }

        // GET: api/Employee/5
        public Employee Get(int id)
        {
            Employee editEmployee = employees.Find(x => x.employeeId == id);

            return editEmployee;
        }

        // POST: api/Employee
        public void Post(Employee employee)
        {
            try
            {
                Employee newEmployee = new Employee();
                newEmployee.employeeId = employee.employeeId;
                newEmployee.firstName = employee.firstName;
                newEmployee.lastName = employee.lastName;
                newEmployee.initials = employee.initials;
                newEmployee.officeId = employee.officeId;

                employees.Add(newEmployee);  //cuando este metodo corre, agrega un elemento a la lista, pero despues cuando hago otra accion sale que la lista tiene los elementos originales (solo dos)
            }
            
            catch (Exception) { }
        }

        // PUT: api/Employee/5
        public void Put(Employee editEmployee) // esta tomando id y office 0 siempre ****
        {
            /*
            var myIndex = employees.FindIndex(x => x.employeeId == editEmployee.employeeId);
            employees[myIndex].firstName = editEmployee.firstName;
            employees[myIndex].lastName = editEmployee.lastName;
            employees[myIndex].initials = editEmployee.initials;
            employees[myIndex].officeId = editEmployee.officeId;
             */
            
            Employee editedEmployee = employees.Find(x => x.employeeId == editEmployee.employeeId);
            editedEmployee.firstName = editEmployee.firstName;
            editedEmployee.lastName = editEmployee.lastName;
            editedEmployee.initials = editEmployee.initials;
            editedEmployee.officeId = editEmployee.officeId;
           
        }

        // DELETE: api/Employee/5
        public void Delete(int id)
        {
            Employee deleteEmployee = employees.Find(x=>x.employeeId == id);
            employees.Remove(deleteEmployee);

            // employees.Remove(employees.Single(s => s.employeeId == id));
        }
    }

   public class EmployeeOffice
    {
        public List<Employee> employees { get; set; }
        public List<Office> offices { get; set; }
    }
}
