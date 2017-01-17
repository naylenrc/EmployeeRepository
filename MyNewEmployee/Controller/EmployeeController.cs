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
            public EmployeeModel ctx = new EmployeeModel();


        // GET: api/Employee
        public List<Employee> Get()
        {
            var getEmployees = ctx.Employees.ToList();
            return getEmployees;          
        }



        // GET: api/Employee/id
          public Employee Get(int id) //no entra aqui 
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
            Employee deleteEmployee = ctx.Employees.FirstOrDefault(x => x.Id == id);
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
