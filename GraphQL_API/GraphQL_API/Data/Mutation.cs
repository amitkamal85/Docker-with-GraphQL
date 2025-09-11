using GraphQL_API.Models;
using Microsoft.EntityFrameworkCore;

namespace GraphQL_API.Data
{
    public class Mutation
    {
        public async Task<TaskItem> CreateTask(
           string title,
           string description,
           string status,
           [Service] IDbContextFactory<ApplicationDbContext> dbFactory)
        {
            using var db = dbFactory.CreateDbContext();
            var task = new TaskItem
            {
                Title = title,
                Description = description,
                Status = status
            };
            db.Tasks.Add(task);
            await db.SaveChangesAsync();

            // Verify the task was saved by checking the ID
            Console.WriteLine($"Task created with ID: {task.Id}");

            return task;
        }

        public async Task<TaskItem> UpdateTask(
            int id,
            string title,
            string description,
            string status,
            [Service] IDbContextFactory<ApplicationDbContext> dbFactory)
        {
            using var db = dbFactory.CreateDbContext();
            var task = await db.Tasks.FindAsync(id);
            if (task == null)
                throw new GraphQLException("Item not found");

            if (!string.IsNullOrEmpty(title)) task.Title = title;
            if (!string.IsNullOrEmpty(description)) task.Description = description;
            if (!string.IsNullOrEmpty(status)) task.Status = status;

            await db.SaveChangesAsync();
            return task;
        }
    }
}
