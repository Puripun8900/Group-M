# Server Directory

This directory contains the backend logic for the application. It is responsible for handling server-side operations, including API endpoints, database interactions, and business logic.

## Structure

```
/server
├── controllers/   # Handles request logic
├── models/        # Database schemas and models
├── routes/        # API route definitions
├── services/      # Business logic and reusable services
├── utils/         # Utility functions and helpers
├── config/        # Configuration files (environment variables)
└── index.js       # Entry point for the server
```

## Prerequisites

- Node.js (v14 or higher)
- npm
- A configured database (MongoDB Atlas)

## Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:Puripun8900/Group-M.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    Create a `.env` file in the root directory and add the required variables (check [env.example](../.env.example)).

4. Start the server:
    ```bash
    npm start
    ```

## Scripts

- `npm start`: Starts the server in production mode.
- `npm run dev`: Starts the server in development mode with hot-reloading.
- `npm test`: Runs the test suite.

## Features

- RESTful API endpoints
- Database integration
- Authentication and authorization
- Error handling and logging

## API Endpoints Overview
Auth Routes:
- POST /auth/signup → Register a new user.

- POST /auth/login → Login and receive JWT.

Sensor Routes:
- GET /sensors → Fetch all sensor data.

- POST /sensors → Add new sensor data.

- PUT /sensors/:id → Update sensor data by ID.

- DELETE /sensors/:id → Delete sensor data by ID.

- DELETE /sensors?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD → Delete data by date range.

- GET /sensors/latest/temperature → Latest temperature.

- GET /sensors/latest/humidity → Latest humidity.

- GET /sensors/latest/peoplecount → Latest people count.

- GET /sensors/history/temperature → Historical temperature data.

- GET /sensors/history/humidity → Historical humidity data.

- GET /sensors/history/peoplecount → Historical people count data.



## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

## Developer
- Md Rakibuzzaman Rakib
- Md.Rakib@student.lab.fi

## License
This project is licensed under the [MIT License](LICENSE).
