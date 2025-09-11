using GraphQL_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace GraphQL_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }
    }
}
