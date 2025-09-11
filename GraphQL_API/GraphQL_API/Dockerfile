# Use the official .NET 8 runtime as base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Use the official .NET 8 SDK for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["GraphQL_API.csproj", "./"]
RUN dotnet restore "GraphQL_API.csproj"

# Copy the rest of the source code
COPY . .

# Build the application
RUN dotnet build "GraphQL_API.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "GraphQL_API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Create the final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set environment variables for containerized environment
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "GraphQL_API.dll"]
