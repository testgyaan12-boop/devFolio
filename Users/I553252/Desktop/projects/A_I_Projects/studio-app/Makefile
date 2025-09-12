# Makefile for Docker Compose management

# Build and start the services in detached mode
up:
	docker-compose up --build -d

# Stop and remove the services
down:
	docker-compose down

# Show logs for the services
logs:
	docker-compose logs -f

# List running containers
ps:
	docker-compose ps

.PHONY: up down logs ps
