import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  TextField,
  TextArea,
  Well,
  Heading,
  Content,
  View,
  Flex,
  Divider,
  Text
} from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import { CreateTaskInput } from "@/types/task";

interface TaskFormProps {
  onSubmit: (task: CreateTaskInput) => void;
  isLoading?: boolean;
}

export const TaskForm = ({ onSubmit, isLoading }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });
    
    setTitle("");
    setDescription("");
  };

  return (
    <Well 
      UNSAFE_style={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <View padding="size-400">
        <Form onSubmit={handleSubmit}>
          <Flex direction="column" gap="size-300">
            <Flex direction="column" gap="size-100">
              <Heading level={3} UNSAFE_style={{ margin: 0, color: '#374151' }}>
                ✨ Create New Task
              </Heading>
              <Text UNSAFE_style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                Add a new task to your list
              </Text>
            </Flex>
            
            <Divider size="S" />
            
            <TextField
              label="Task Title"
              value={title}
              onChange={setTitle}
              placeholder="What needs to be done?"
              isRequired
              autoFocus
            />
            
            <TextArea
              label="Description (Optional)"
              value={description}
              onChange={setDescription}
              placeholder="Add more details about this task..."
              height="size-1200"
            />
            
            <ButtonGroup>
              <Button
                type="submit"
                variant="cta"
                isDisabled={!title.trim() || isLoading}
                UNSAFE_style={{
                  background: title.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : undefined,
                  border: 'none'
                }}
              >
                <Add />
                <Content>{isLoading ? "Adding Task..." : "Add Task"}</Content>
              </Button>
            </ButtonGroup>
          </Flex>
        </Form>
      </View>
    </Well>
  );
};