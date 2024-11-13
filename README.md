# E-commerce 
## Introduction:
- This is a full-stack, professional-grade e-commerce platform built with Next.js on the frontend and Java Spring on the backend, with MySQL as the primary database.
-  The project aims to provide a high-performance, scalable, and robust platform for online shopping with a clean code structure, following best practices in design patterns and software architecture. The backend is optimized with Redis for caching, Kafka for asynchronous messaging, and a rate limiter to manage API usage effectively.

## Features: 
- User Authentication & Authorization: Secure user registration, login, and role-based access control.
- Product Management: Admin panel for managing product details, images, stock, and categories.
- Shopping Cart & Checkout: Seamless shopping cart functionality and an optimized checkout process.
- Order Management: Real-time order processing and tracking, with notifications and status updates.
- Notifications System: Powered by the Observer pattern to notify users and admins on critical events.
- High-Performance Caching: Integrated Redis for caching frequently accessed data.
- Messaging Queue: Using Kafka for reliable and scalable message queuing between microservices.
- Rate Limiting: Implemented rate limiting to protect APIs from abuse and ensure system stability.

## Technologies & Dependencies:
## Frontend
- Next.js: React-based framework for server-rendered and static websites.
- TypeScript: Static typing for enhanced code quality and maintainability.
- Tailwind CSS: Utility-first CSS framework for custom, responsive designs.
- Ant Design: UI library for a consistent and professional design.
- SWR: Data fetching and caching for a better user experience.

## Backend
- Java Spring: Main backend framework for REST API and service management.
- MySQL: Relational database for data storage.
- Redis: In-memory data store for caching and reducing database load.
- Kafka: Distributed event streaming for reliable communication between services.
- Rate Limiter: Control traffic and protect endpoints from overuse.

## Design Patterns:
This project emphasizes clean architecture and efficient design by incorporating the following patterns:

- Facade Pattern: Provides a unified interface for handling complex operations like user registration and order processing.
- Observer Pattern: Decouples components, allowing the system to react to various events (e.g., new order, stock update) through subscriptions and notifications.

## System Architecture
- Frontend: Built with Next.js to leverage server-side rendering (SSR) and client-side rendering (CSR) for a responsive, fast-loading user experience.
- Backend: Java Spring-based RESTful services, handling business logic and database interactions efficiently.
- Database: MySQL as the primary relational database, with data caching in Redis to minimize read latency.
- Messaging: Kafka as the backbone for asynchronous communication, enhancing the platform's scalability and fault tolerance.
- Rate Limiting: Rate limiter implemented to control access to critical endpoints, improving security and resilience.

## Getting Started
Prerequisites
- Node.js and npm (for the frontend)
- Java (Java Spring Boot)
- MySQL (Database)
- Redis (Caching)
- Kafka (Messaging queue)

## Installation
1- Clone the repository:
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/NourhanSaeed707/E-commerce.git)

2- Frontend Setup:
- Navigate to the frontend directory: 
- **cd frontend**
- **install npm**
- start server: **npm run dev**
  
3- Backend Setup:
- Open the backend project in your preferred IDE.
- Configure the application.properties file with your MySQL, Redis, and Kafka configurations.
- Run the Spring Boot application:


