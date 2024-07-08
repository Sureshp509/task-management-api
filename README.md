# Task Management API

This repository contains a task management API built using Express.js, MongoDB, and GraphQL. The API supports multi-tenancy, role-based access control (RBAC), task management functionality, and includes additional features such as logging, search, rate limiting, and advanced MongoDB usage.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running locally or accessible via a remote URI.
- Postman (optional) for testing API endpoints.

### Installation

1. **Clone the repository:**
   git clone https://github.com/Sureshp509/task-management-api.git

2. **Install dependencies:**
  npm install

3. **Set environment variables:**
    Create a .env file in the root directory and change the following variables:

    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/task_management_db
    JWT_SECRET=your_jwt_secret_here

4. **Start the server:**
    cd src
    node index.js



