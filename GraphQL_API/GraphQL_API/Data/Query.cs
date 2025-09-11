using GraphQL_API.Models;
using Microsoft.EntityFrameworkCore;

namespace GraphQL_API.Data
{
    public class Query
    {
        public async Task<List<TaskItem>> GetTasks([Service] IDbContextFactory<ApplicationDbContext> dbFactory)
        {
            await using var db = await dbFactory.CreateDbContextAsync();
            var tasks = await db.Tasks.ToListAsync(); // Materialize list
            return tasks; // Return fully loaded List, not IQueryable
        }

    }
}
