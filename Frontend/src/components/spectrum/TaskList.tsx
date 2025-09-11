import { useMemo } from "react";
import {
  View,
  Flex,
  Heading,
  Text,
  IllustratedMessage,
  Content
} from "@adobe/react-spectrum";
import { Task, TaskStatus, TaskFilter } from "@/types/task";
import { TaskItem } from "./TaskItem";
import { TaskFilters } from "./TaskFilters";

interface TaskListProps {
  tasks: Task[];
  onStatusToggle: (taskId: number, newStatus: TaskStatus, title?: string, description?: string) => Promise<void>;
  onEdit: (taskId: number, title: string, description: string) => Promise<void>;
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export const TaskList = ({ 
  tasks, 
  onStatusToggle, 
  onEdit, 
  activeFilter, 
  onFilterChange 
}: TaskListProps) => {
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'PENDING':
        return tasks.filter(task => task.status === TaskStatus.PENDING);
      case 'COMPLETED':
        return tasks.filter(task => task.status === TaskStatus.COMPLETED);
      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  const taskCounts = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(task => task.status === TaskStatus.PENDING).length,
    completed: tasks.filter(task => task.status === TaskStatus.COMPLETED).length,
  }), [tasks]);

  if (tasks.length === 0) {
    return (
      <View>
        <IllustratedMessage>
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
            <circle cx="75" cy="75" r="60" fill="#f0f0f0"/>
            <path d="M60 60 L90 90 M90 60 L60 90" stroke="#999" strokeWidth="2"/>
          </svg>
          <Heading>No tasks yet</Heading>
          <Content>Create your first task to get started!</Content>
        </IllustratedMessage>
      </View>
    );
  }

  return (
    <Flex direction="column" gap="size-300">
      <TaskFilters
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        taskCounts={taskCounts}
      />
      
      {filteredTasks.length === 0 ? (
        <View padding="size-400">
          <Text>No {activeFilter.toLowerCase()} tasks found.</Text>
        </View>
      ) : (
        <Flex direction="column" gap="size-200">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusToggle={onStatusToggle}
              onEdit={onEdit}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};