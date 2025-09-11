import { useState, useCallback, useEffect } from "react";
import { Task, TaskStatus, CreateTaskInput, UpdateTaskInput } from "@/types/task";
import { 
  graphqlClient, 
  GET_TASKS, 
  CREATE_TASK, 
  UPDATE_TASK,
  GetTasksResponse,
  CreateTaskResponse,
  UpdateTaskResponse
} from "@/lib/graphql";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load tasks on component mount
  useEffect(() => {
    refetchTasks();
  }, []);

  // Create task using GraphQL API
  const createTask = useCallback(async (input: CreateTaskInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Creating task via GraphQL API:", input);
      const response = await graphqlClient.request<CreateTaskResponse>(CREATE_TASK, {
        title: input.title,
        description: input.description,
        status: TaskStatus.PENDING.toString(),
      });

      const newTask: Task = {
        id: response.createTask.id,
        title: response.createTask.title,
        description: response.createTask.description,
        status: response.createTask.status,
      };

      // Update local state
      setTasks(prev => [newTask, ...prev]);
      console.log("Task created successfully via API:", newTask.title);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      setError(errorMessage);
      console.error("Error creating task:", err);
      console.error("Input data:", input);
      throw err; // Re-throw to let the UI handle the error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update task status using GraphQL API
  const updateTaskStatus = useCallback(async (taskId: number, newStatus: TaskStatus, title?: string, description?: string) => {
    setError(null);
    
    try {
      // Find the current task to get existing values
      const currentTask = tasks.find(task => task.id === taskId);
      if (!currentTask) {
        throw new Error('Task not found');
      }

      console.log("Updating task via GraphQL API:", { taskId, newStatus, title, description });
      const response = await graphqlClient.request<UpdateTaskResponse>(UPDATE_TASK, {
        id: taskId,
        title: title || currentTask.title,
        description: description || currentTask.description,
        status: newStatus.toString(),
      });

      const updatedTask: Task = {
        id: response.updateTask.id,
        title: response.updateTask.title,
        description: response.updateTask.description,
        status: response.updateTask.status,
      };

      // Update local state
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));

      console.log(`Task ${newStatus === TaskStatus.COMPLETED ? "completed" : "reopened"} via API:`, taskId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      console.error("Error updating task:", err);
      throw err; // Re-throw to let the UI handle the error
    }
  }, [tasks]);

  // Edit task using GraphQL API
  const editTask = useCallback(async (taskId: number, title: string, description: string) => {
    setError(null);
    
    try {
      // Find the current task to get existing status
      const currentTask = tasks.find(task => task.id === taskId);
      if (!currentTask) {
        throw new Error('Task not found');
      }

      console.log("Editing task via GraphQL API:", { taskId, title, description });
      const response = await graphqlClient.request<UpdateTaskResponse>(UPDATE_TASK, {
        id: taskId,
        title: title,
        description: description,
        status: currentTask.status, // Keep existing status
      });

      const updatedTask: Task = {
        id: response.updateTask.id,
        title: response.updateTask.title,
        description: response.updateTask.description,
        status: response.updateTask.status,
      };
      
      // Update local state
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      
      console.log("Task edited successfully via API:", taskId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to edit task';
      setError(errorMessage);
      console.error("Error editing task:", err);
      throw err; // Re-throw to let the UI handle the error
    }
  }, [tasks]);

  // Fetch tasks using GraphQL API
  const refetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Fetching tasks via GraphQL API");
      const response = await graphqlClient.request<GetTasksResponse>(GET_TASKS);
      
      const tasks: Task[] = response.tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      }));
      
      setTasks(tasks);
      console.log("Tasks loaded from API:", tasks.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(errorMessage);
      console.error("Error fetching tasks:", err);
      
      // Fallback to empty array if API fails
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTaskStatus,
    editTask,
    refetchTasks,
  };
};