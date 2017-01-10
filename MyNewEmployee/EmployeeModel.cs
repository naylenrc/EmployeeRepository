using MyNewEmployee.Model;
using System.Collections.Generic;
using System.Data.Entity;


namespace MyNewEmployee
{
    public partial class EmployeeModel : DbContext
    {
        public EmployeeModel()
            : base("name=EmployeeSolutionModel")
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Office> Offices { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .Property(e => e.FirstName)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.LastName)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Initials)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.OfficeId)
                .IsUnicode(false);

            modelBuilder.Entity<Office>()
                .Property(e => e.Name)
                .IsUnicode(false);
        }
    }
}
