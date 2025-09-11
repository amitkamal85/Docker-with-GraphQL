import { useState, useEffect } from "react";
import {
  View,
  Flex,
  Checkbox,
  Text,
  Heading,
  StatusLight,
  ActionButton,
  ButtonGroup,
  Well,
  Content,
  TextField,
  TextArea,
  Button
} from "@adobe/react-spectrum";
import Edit from "@spectrum-icons/workflow/Edit";
import Checkmark from "@spectrum-icons/workflow/Checkmark";
import { Task, TaskStatus } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onStatusToggle: (taskId: number, newStatus: TaskStatus, title?: string, description?: string) => Promise<void>;
  onEdit: (taskId: number, title: string, description: string) => Promise<void>;
}

export const TaskItem = ({ task, onStatusToggle, onEdit }: TaskItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  
  const isCompleted = task.status === TaskStatus.COMPLETED;
  
  // Update edit state when task changes
  useEffect(() => {
    setEditTitle(task.title);
    setEditDescription(task.description);
  }, [task.title, task.description]);
  
  const handleStatusToggle = async () => {
    setIsUpdating(true);
    const newStatus = isCompleted ? TaskStatus.PENDING : TaskStatus.COMPLETED;
    await onStatusToggle(task.id, newStatus, task.title, task.description);
    setIsUpdating(false);
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleEditSave = async () => {
    if (editTitle.trim()) {
      await onEdit(task.id, editTitle.trim(), editDescription.trim());
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  return (
    <Well 
      UNSAFE_style={{ 
        boxShadow: isCompleted 
          ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
          : '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        border: isCompleted 
          ? '1px solid rgba(16, 185, 129, 0.2)' 
          : '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'white',
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <View padding="size-300">
        <Flex direction="row" gap="size-200" alignItems="start">
          <Checkbox
            isSelected={isCompleted}
            onChange={handleStatusToggle}
            isDisabled={isUpdating}
          />
          
          <Flex direction="column" gap="size-150" flex={1} minWidth={0}>
            {isEditing ? (
              // Edit Mode
              <Flex direction="column" gap="size-200">
                <TextField
                  label="Title"
                  value={editTitle}
                  onChange={setEditTitle}
                  isRequired
                  UNSAFE_style={{ minWidth: 0 }}
                />
                <TextArea
                  label="Description"
                  value={editDescription}
                  onChange={setEditDescription}
                  UNSAFE_style={{ minWidth: 0 }}
                />
                <Flex direction="row" gap="size-200">
                  <Button
                    variant="primary"
                    onPress={handleEditSave}
                    isDisabled={!editTitle.trim()}
                    UNSAFE_style={{ fontSize: '0.8rem' }}
                  >
                    <Checkmark />
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onPress={handleEditCancel}
                    UNSAFE_style={{ fontSize: '0.8rem' }}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            ) : (
              // View Mode
              <>
                <Flex direction="row" gap="size-200" alignItems="center" wrap>
                  <Heading 
                    level={4} 
                    UNSAFE_style={{
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      opacity: isCompleted ? 0.6 : 1,
                      margin: 0,
                      flex: 1,
                      minWidth: 0,
                      color: isCompleted ? '#6B7280' : '#374151',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    {task.title}
                  </Heading>
                  
                  <StatusLight 
                    variant={isCompleted ? "positive" : "notice"}
                    UNSAFE_style={{
                      backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: isCompleted ? '#10B981' : '#F59E0B',
                      border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                      paddingRight:"10px"
                    }}
                  >
                    {isCompleted ? "✅ Completed" : "⏳ Pending"}
                  </StatusLight>
                </Flex>
                
                {task.description && (
                  <Text 
                    UNSAFE_style={{
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      opacity: isCompleted ? 0.5 : 0.8,
                      color: isCompleted ? '#9CA3AF' : '#6B7280',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    {task.description}
                  </Text>
                )}
                
                <Flex direction="row" gap="size-300" wrap>
                  <Text UNSAFE_style={{ 
                    fontSize: '0.75rem', 
                    opacity: 0.6,
                    color: '#9CA3AF'
                  }}>
                    🆔 ID: {task.id}
                  </Text>
                </Flex>
              </>
            )}
          </Flex>
          
          {!isEditing && (
            <ButtonGroup>
              <ActionButton 
                isQuiet
                onPress={handleEditStart}
                UNSAFE_style={{ 
                  opacity: 0.7,
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                <Edit />
              </ActionButton>
            </ButtonGroup>
          )}
        </Flex>
      </View>
    </Well>
  );
};