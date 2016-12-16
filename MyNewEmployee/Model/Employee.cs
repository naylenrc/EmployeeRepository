using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyNewEmployee.Model
{
    public class Employee
    {
        public int employeeId { get; set; }
        public string firstName { set; get; }
        public string lastName { set; get; }
        public string initials { set; get; }
        public int officeId { set; get; }

    }
}