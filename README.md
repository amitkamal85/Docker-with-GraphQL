# GraphQL Task Management Application

A full-stack task management application built with React frontend and .NET 8 GraphQL backend, containerized with Docker.

## 🏗️ Architecture

- **Frontend**: React 18 with TypeScript, Vite, and Adobe React Spectrum UI components
- **Backend**: .NET 8 Web API with HotChocolate GraphQL
- **Database**: SQL Server 2022
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
GraphQL_API/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # GraphQL client configuration
│   │   ├── pages/          # Application pages
│   │   └── types/          # TypeScript type definitions
│   ├── Dockerfile          # Frontend container configuration
│   └── nginx.conf          # Nginx configuration for production
├── GraphQL_API/            # .NET backend application
│   ├── GraphQL_API/
│   │   ├── Controllers/    # API controllers
│   │   ├── Data/          # Database context and GraphQL resolvers
│   │   ├── Models/        # Data models
│   │   ├── Dockerfile     # Backend container configuration
│   │   └── Program.cs     # Application entry point
├── docker-compose.yml      # Multi-container orchestration
└── README.md              # This file
```

## 🚀 Quick Start with Docker

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Git](https://git-scm.com/) for cloning the repository

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd GraphQL_API
```

### 2. Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend GraphQL Playground**: http://localhost:8081/graphql
- **Backend Health Check**: http://localhost:8081/health

## 🛠️ Development Setup

### Option 1: Local Development (Without Docker)

#### Backend Setup (.NET 8)

1. **Install Prerequisites**:
   - [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
   - [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

2. **Configure Database**:
   ```bash
   cd GraphQL_API/GraphQL_API
   ```
   
   Update `appsettings.json` with your SQL Server connection string:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER;Database=GraphQLDb;Trusted_Connection=True;TrustServerCertificate=True;"
     }
   }
   ```

3. **Run the Backend**:
   ```bash
   dotnet restore
   dotnet run
   ```

#### Frontend Setup (React)

1. **Install Prerequisites**:
   - [Node.js 18+](https://nodejs.org/)

2. **Install Dependencies and Run**:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

### Option 2: Hybrid Development (Backend in Docker, Frontend Local)

1. **Start only the database and backend**:
   ```bash
   docker-compose up sqlserver backend
   ```

2. **Run frontend locally**:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

## 🐳 Docker Commands

### Basic Commands

```bash
# Build and start all services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs sqlserver
```

### Development Commands

```bash
# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Restart specific service
docker-compose restart backend

# Execute commands in running container
docker-compose exec backend bash
docker-compose exec frontend sh
```

### Database Commands

```bash
# Connect to SQL Server container
docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd

# Backup database
docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "BACKUP DATABASE GraphQLDb TO DISK = '/var/opt/mssql/backup/GraphQLDb.bak'"

# Restore database
docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "RESTORE DATABASE GraphQLDb FROM DISK = '/var/opt/mssql/backup/GraphQLDb.bak'"
```

## 🔧 Configuration

### Environment Variables

#### Backend (.NET)
- `ASPNETCORE_ENVIRONMENT`: Set to `Production` for containerized deployment
- `ASPNETCORE_URLS`: Set to `http://+:8080` for container networking
- `ConnectionStrings__DefaultConnection`: Database connection string

#### Frontend (React)
- `NODE_ENV`: Set to `production` for optimized builds
- GraphQL endpoint automatically configured based on environment

### Database Configuration

The application uses SQL Server with the following default settings:
- **Server**: `sqlserver` (container name)
- **Database**: `GraphQLDb`
- **Username**: `sa`
- **Password**: `YourStrong@Passw0rd`

**⚠️ Security Note**: Change the default password in production environments!

## 📊 API Documentation

### GraphQL Endpoints

- **GraphQL Playground**: http://localhost:8081/graphql
- **GraphQL Schema**: Available through the playground interface

### REST Endpoints

- **Health Check**: `GET /health`
- **Swagger UI**: `GET /swagger` (development only)

### Sample GraphQL Queries

```graphql
# Get all tasks
query GetTasks {
  tasks {
    id
    title
    description
    status
  }
}

# Create a new task
mutation CreateTask {
  createTask(title: "New Task", description: "Task description", status: "Pending") {
    id
    title
    description
    status
  }
}

# Update a task
mutation UpdateTask {
  updateTask(id: 1, title: "Updated Task", status: "Completed") {
    id
    title
    description
    status
  }
}
```

## 🧪 Testing

### Backend Testing

```bash
cd GraphQL_API/GraphQL_API
dotnet test
```

### Frontend Testing

```bash
cd Frontend
npm test
```

### Integration Testing with Docker

```bash
# Run tests in containerized environment
docker-compose -f docker-compose.test.yml up --build
```

## 🚀 Deployment

### Production Deployment

1. **Update Configuration**:
   - Change database password in `docker-compose.yml`
   - Update connection strings for production database
   - Configure proper CORS settings

2. **Build Production Images**:
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

3. **Deploy**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Cloud Deployment

The application is ready for deployment on:
- **Azure Container Instances**
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Kubernetes**

## 🔍 Troubleshooting

### Common Issues

1. **Port Conflicts**:
   ```bash
   # Check if ports are in use
   netstat -an | findstr :3000
   netstat -an | findstr :8081
   netstat -an | findstr :1433
   ```

2. **Database Connection Issues**:
   ```bash
   # Check SQL Server container logs
   docker-compose logs sqlserver
   
   # Test database connectivity
   docker-compose exec backend dotnet ef database update
   ```

3. **Frontend Build Issues**:
   ```bash
   # Clear npm cache
   cd Frontend
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Container Issues**:
   ```bash
   # Remove all containers and volumes
   docker-compose down -v
   docker system prune -a
   
   # Rebuild from scratch
   docker-compose up --build --force-recreate
   ```

### Health Checks

All services include health checks:
- **Backend**: `GET /health`
- **Frontend**: `GET /health`
- **Database**: SQL connectivity test

Check service health:
```bash
docker-compose ps
```

## 📝 Development Notes

### Adding New Features

1. **Backend (GraphQL)**:
   - Add models in `Models/` directory
   - Update `ApplicationDbContext.cs`
   - Add resolvers in `Data/Query.cs` or `Data/Mutation.cs`

2. **Frontend (React)**:
   - Add components in `src/components/`
   - Update GraphQL queries in `src/lib/graphql.ts`
   - Add types in `src/types/`

### Code Style

- **Backend**: Follow C# conventions and use nullable reference types
- **Frontend**: Use TypeScript strict mode and ESLint configuration
- **Docker**: Multi-stage builds for optimized images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review Docker and .NET documentation

---

**Happy Coding! 🚀**
