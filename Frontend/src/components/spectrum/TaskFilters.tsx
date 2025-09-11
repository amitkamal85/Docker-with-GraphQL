import {
  Button,
  ButtonGroup,
  Flex,
  Badge,
  Text,
  View
} from "@adobe/react-spectrum";
import { TaskFilter } from "@/types/task";

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    total: number;
    pending: number;
    completed: number;
  };
}

export const TaskFilters = ({ activeFilter, onFilterChange, taskCounts }: TaskFiltersProps) => {
  const filters: { key: TaskFilter; label: string; count: number }[] = [
    { key: 'ALL', label: 'All Tasks', count: taskCounts.total },
    { key: 'PENDING', label: 'Pending', count: taskCounts.pending },
    { key: 'COMPLETED', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <View>
      <ButtonGroup>
        {filters.map(({ key, label, count }) => (
          <Button
            key={key}
            variant={activeFilter === key ? "cta" : "secondary"}
            onPress={() => onFilterChange(key)}
            UNSAFE_style={{
              background: activeFilter === key 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : undefined,
              border: activeFilter === key ? 'none' : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: activeFilter === key 
                ? '0 2px 4px rgba(0, 0, 0, 0.1)' 
                : '0 1px 2px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <Flex direction="row" gap="size-150" alignItems="center">
              <Text UNSAFE_style={{ 
                color: activeFilter === key ? 'white' : '#374151',
                fontWeight: activeFilter === key ? '600' : '500'
              }}>
                {label}
              </Text>
              <Badge 
                variant={activeFilter === key ? "positive" : "neutral"}
                UNSAFE_style={{
                  backgroundColor: activeFilter === key 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'rgba(0, 0, 0, 0.1)',
                  color: activeFilter === key ? 'white' : '#6B7280',
                  border: 'none'
                }}
              >
                {count}
              </Badge>
            </Flex>
          </Button>
        ))}
      </ButtonGroup>
    </View>
  );
};