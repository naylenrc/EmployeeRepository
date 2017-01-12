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
        //public List<Employee> employees = new List<Employee>()
        //{
        //    new Employee () {employeeId = 0, firstName = "Naylen", lastName = "Ramirez", initials = "NR", officeId = "New York"},
        //    new Employee () {employeeId = 1, firstName = "Jose", lastName = "Mendez", initials = "JM", officeId = "London"}

        //};
      //  public Model1 ctx = new Model1();       

            public EmployeeModel ctx = new EmployeeModel();


      /*  public List<Office> offices = new List<Office>()
        {
            new Office () {id = 1, name = "New York"},
            new Office () {id = 2, name = "London"}
        };
*/

        // GET: api/Employee
        public List<Employee> Get()
        {
            var getEmployees = ctx.Employees.ToList();
            return getEmployees;          
        }



        // GET: api/Employee/id
          public Employee Get(int id)
          {
              Employee getEmployee = ctx.Employees.Find(id);
              return getEmployee;
          }

        // POST: api/Employee
        public void Post(Employee employee)
        {
            using (var db = new EmployeeModel())
            {
                db.Employees.Add(employee);
                db.SaveChanges();
            }
        }

        // PUT: api/Employee/5
        public void Put(Employee editEmployee)  // siempre me trae id 0 ** arreglar el js **
        {

            var emp = ctx.Employees.Find(editEmployee.Id);
            emp.FirstName = editEmployee.FirstName;
            emp.LastName = editEmployee.LastName;
            emp.Initials = editEmployee.Initials;
            emp.OfficeId = editEmployee.OfficeId;

            ctx.SaveChanges();
        }
        

        // DELETE: api/Employee/5
        public void Delete(int id)
        {
            Employee deleteEmployee = ctx.Employees.Find(id);
            ctx.Employees.Remove(deleteEmployee);
            ctx.SaveChanges();
        }
    }

   public class EmployeeOffice
    {
        public List<Employee> employees { get; set; }
        public List<Office> offices { get; set; }
    }
}
