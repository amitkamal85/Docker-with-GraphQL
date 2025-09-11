import { useState } from "react";
import {
  View,
  Grid,
  Flex,
  Heading,
  Text,
  StatusLight,
  Well,
  Divider,
  ProgressCircle
} from "@adobe/react-spectrum";
import { useIsMobile } from "@/hooks/use-mobile";
import { TaskForm } from "@/components/spectrum/TaskForm";
import { TaskList } from "@/components/spectrum/TaskList";
import { TaskStats } from "@/components/spectrum/TaskStats";
import { TaskFilter } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";

const Index = () => {
  const { tasks, isLoading, error, createTask, updateTaskStatus, editTask } = useTasks();
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('ALL');
  const isMobile = useIsMobile();

  return (
    <View height="100vh" backgroundColor="gray-50">
      {/* Header */}
      <Well 
        UNSAFE_style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          marginTop:"0"
        }}
      >
        <View padding={isMobile ? "size-300" : "size-400"}>
          <Flex direction={isMobile ? "column" : "row"} alignItems="center" justifyContent="space-between" gap="size-300" wrap>
            <Flex direction="column" gap="size-100">
              <Heading level={1} UNSAFE_style={{ color: 'white', margin: 0, fontSize: isMobile ? '1.5rem' : '2rem' }}>
                🚀 Task Manager
              </Heading>
              <Text UNSAFE_style={{ color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>
                Technical Assessment - React + GraphQL + Adobe Spectrum
              </Text>
            </Flex>
            <Flex direction="row" alignItems="center" gap="size-200" wrap>
              <StatusLight variant="positive" >
                Real-time Sync Ready
              </StatusLight>
              {isLoading && (
                <Flex direction="row" alignItems="center" gap="size-100">
                  <ProgressCircle size="S" isIndeterminate />
                  <Text UNSAFE_style={{ color: 'rgba(255,255,255,0.8)' }}>Processing...</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </View>
      </Well>

      {/* Main Content */}
      <View padding={isMobile ? "size-300" : "size-500"} flex={1} overflow="auto" backgroundColor="gray-50">
        <View maxWidth="1400px" marginX="auto" width="100%">
          {/* Error Display */}
          {error && (
            <View marginBottom="size-300">
              <Well UNSAFE_style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#DC2626'
              }}>
                <Flex direction="column" gap="size-100">
                  <Heading level={4} UNSAFE_style={{ color: '#DC2626', margin: 0 }}>
                    ⚠️ GraphQL Error
                  </Heading>
                  <Text UNSAFE_style={{ color: '#DC2626' }}>
                    {error}
                  </Text>
                </Flex>
              </Well>
            </View>
          )}
          {isMobile ? (
            // Mobile layout - stacked vertically
            <Flex direction="column" gap="size-400">
              {/* Task Form */}
              <View>
                <TaskForm onSubmit={createTask} isLoading={isLoading} />
              </View>
              
              {/* Stats */}
              <View>
                <TaskStats tasks={tasks} />
              </View>

              {/* Task List */}
              <View>
                <Flex direction="column" gap="size-400">
                  <Flex direction="row" alignItems="center" justifyContent="space-between" wrap>
                    <Heading level={2} UNSAFE_style={{ margin: 0 }}>
                      📋 Your Tasks
                    </Heading>
                    <Text UNSAFE_style={{ color: 'gray-600', fontSize: '0.9rem' }}>
                      {tasks.length} total tasks
                    </Text>
                  </Flex>
                  <Divider size="M" />
                  <TaskList
                    tasks={tasks}
                    onStatusToggle={updateTaskStatus}
                    onEdit={editTask}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                  />
                </Flex>
              </View>
            </Flex>
          ) : (
            // Desktop layout - grid
            <Grid
              areas={[
                "form list",
                "stats list"
              ]}
              columns={["minmax(300px, 350px)", "1fr"]}
              rows={["auto", "1fr"]}
              gap="size-500"
              UNSAFE_style={{ minWidth: 0 }}
            >
              {/* Task Form */}
              <View gridArea="form">
                <TaskForm onSubmit={createTask} isLoading={isLoading} />
              </View>
              
              {/* Stats */}
              <View gridArea="stats">
                <TaskStats tasks={tasks} />
              </View>

              {/* Task List */}
              <View gridArea="list">
                <Flex direction="column" gap="size-400">
                  <Flex direction="row" alignItems="center" justifyContent="space-between" wrap>
                    <Heading level={2} UNSAFE_style={{ margin: 0 }}>
                      📋 Your Tasks
                    </Heading>
                    <Text UNSAFE_style={{ color: 'gray-600', fontSize: '0.9rem' }}>
                      {tasks.length} total tasks
                    </Text>
                  </Flex>
                  <Divider size="M" />
                  <TaskList
                    tasks={tasks}
                    onStatusToggle={updateTaskStatus}
                    onEdit={editTask}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                  />
                </Flex>
              </View>
            </Grid>
          )}
        </View>
      </View>

      {/* Footer */}
      <Well UNSAFE_style={{ backgroundColor: 'gray-100' }}>
        <View padding={isMobile ? "size-200" : "size-300"}>
          <Flex direction="column" gap="size-150" alignItems="center">
            <Text UNSAFE_style={{ fontWeight: '500', color: 'gray-700', fontSize: isMobile ? '0.9rem' : '1rem', textAlign: 'center' }}>
              🛠️ Built with React, TypeScript, Adobe React Spectrum & GraphQL
            </Text>
            <Text UNSAFE_style={{ fontSize: isMobile ? '0.75rem' : '0.875rem', color: 'gray-500', textAlign: 'center' }}>
              Ready for ASP.NET Core backend • GraphQL Schema: Task (id, title, description, status)
            </Text>
          </Flex>
        </View>
      </Well>
    </View>
  );
};

export default Index;
