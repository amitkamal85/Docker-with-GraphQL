import {
  View,
  Flex,
  Heading,
  Text,
  Well,
  StatusLight,
  ProgressBar,
  Divider
} from "@adobe/react-spectrum";
import { Task } from "@/types/task";

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'PENDING').length;
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Well 
      UNSAFE_style={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}
    >
      <View padding="size-400">
        <Flex direction="column" gap="size-300">
          <Flex direction="column" gap="size-100">
            <Heading level={4} UNSAFE_style={{ margin: 0, color: '#374151' }}>
              📊 Quick Stats
            </Heading>
            <Text UNSAFE_style={{ color: '#6B7280', fontSize: '0.9rem' }}>
              Your productivity overview
            </Text>
          </Flex>
          
          <Divider size="S" />
          
          <Flex direction="column" gap="size-200">
            <Flex direction="row" justifyContent="space-between" alignItems="center">
              <Text UNSAFE_style={{ color: '#374151', fontWeight: '500' }}>
                📋 Total Tasks:
              </Text>
              <Text UNSAFE_style={{ 
                fontWeight: 'bold', 
                fontSize: '1.2rem',
                color: '#1F2937'
              }}>
                {totalTasks}
              </Text>
            </Flex>
            
            <Flex direction="row" justifyContent="space-between" alignItems="center">
              <Text UNSAFE_style={{ color: '#374151', fontWeight: '500' }}>
                ⏳ Pending:
              </Text>
              <Flex direction="row" gap="size-150" alignItems="center">
                <StatusLight 
                  variant="notice"
                  UNSAFE_style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    color: '#F59E0B',
                    border: '1px solid rgba(245, 158, 11, 0.3)'
                  }}
                />
                <Text UNSAFE_style={{ 
                  fontWeight: 'bold',
                  color: '#F59E0B'
                }}>
                  {pendingTasks}
                </Text>
              </Flex>
            </Flex>
            
            <Flex direction="row" justifyContent="space-between" alignItems="center">
              <Text UNSAFE_style={{ color: '#374151', fontWeight: '500' }}>
                ✅ Completed:
              </Text>
              <Flex direction="row" gap="size-150" alignItems="center">
                <StatusLight 
                  variant="positive"
                  UNSAFE_style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10B981',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                />
                <Text UNSAFE_style={{ 
                  fontWeight: 'bold',
                  color: '#10B981'
                }}>
                  {completedTasks}
                </Text>
              </Flex>
            </Flex>
            
            <Divider size="S" />
            
            <Flex direction="column" gap="size-150">
              <Flex direction="row" justifyContent="space-between" alignItems="center">
                <Text UNSAFE_style={{ color: '#374151', fontWeight: '500' }}>
                  🎯 Completion Rate:
                </Text>
                <Text UNSAFE_style={{ 
                  fontWeight: 'bold', 
                  fontSize: '1.1rem',
                  color: completionRate >= 80 ? '#10B981' : completionRate >= 50 ? '#F59E0B' : '#EF4444'
                }}>
                  {completionRate}%
                </Text>
              </Flex>
              
              <ProgressBar 
                value={completionRate} 
                UNSAFE_style={{
                  '--spectrum-progressbar-track-color': 'rgba(0, 0, 0, 0.1)',
                  '--spectrum-progressbar-fill-color': completionRate >= 80 ? '#10B981' : completionRate >= 50 ? '#F59E0B' : '#EF4444'
                }}
              />
              
              <Text UNSAFE_style={{ 
                fontSize: '0.8rem', 
                color: '#6B7280',
                textAlign: 'center'
              }}>
                {completionRate >= 80 ? '🎉 Excellent progress!' : 
                 completionRate >= 50 ? '👍 Good progress!' : 
                 '💪 Keep going!'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </View>
    </Well>
  );
};