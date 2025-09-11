import { GraphQLClient } from 'graphql-request';

// GraphQL client configuration
// Connected to the .NET 8 GraphQL backend
const endpoint = process.env.NODE_ENV === 'production'
  ? 'http://localhost:8081/graphql'
  : 'http://localhost:8081/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  // Add error handling for development
  errorPolicy: 'all',
});

// GraphQL Queries and Mutations
export const GET_TASKS = `
  query GetTasks {
    tasks {
      id
      title
      description
      status
    }
  }
`;

export const CREATE_TASK = `
  mutation CreateTask($title: String!, $description: String!, $status: String!) {
    createTask(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

export const UPDATE_TASK = `
  mutation UpdateTask($id: Int!, $title: String!, $description: String!, $status: String!) {
    updateTask(id: $id, title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

// Input types for mutations
export interface CreateTaskInput {
  title: string;
  description: string;
}

export interface UpdateTaskInput {
  id: number;
  title?: string;
  description?: string;
  status?: string;
}

// Response types
export interface GetTasksResponse {
  tasks: Array<{
    id: number;
    title: string;
    description: string;
    status: string;
  }>;
}

export interface CreateTaskResponse {
  createTask: {
    id: number;
    title: string;
    description: string;
    status: string;
  };
}

export interface UpdateTaskResponse {
  updateTask: {
    id: number;
    title: string;
    description: string;
    status: string;
  };
}

