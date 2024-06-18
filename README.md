# FullStack Kanban Task

![React.js](https://img.shields.io/badge/react.js-18.0.0-brightgreen.svg)
![Next.js](https://img.shields.io/badge/next.js-14.2.3-brightgreen.svg)
![Node.js](https://img.shields.io/badge/node.js-18.17.1-brightgreen.svg)
![Express.js](https://img.shields.io/badge/express.js-4.19.2-brightgreen.svg)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction

Full Kanban Task is a project management tool that allows you to create tasks, and then drag and drop them to manage your workflow.

## Features

- **Client-side rendering with Next.js**: Uses Next.js for single-page application (SPA) capabilities and dynamic routing.
- **RESTful API integration**: Efficient data communication using a custom API built with Express.js.
- **Responsive design with Tailwind CSS**: Ensures the application is accessible and visually appealing across different devices.
- **Drag-and-drop functionality**: Intuitive task management with drag-and-drop support for seamless interaction.

## Technologies

- **Next.js** - Framework for server-side rendered and static web applications.
- **React** - JavaScript library for building user interfaces.
- **Node.js** - JavaScript runtime for server-side applications.
- **Express** - Web framework for Node.js (if used for custom server).
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **TypeScript** - Typed superset of JavaScript for improved developer experience.
- **Axios** - Promise-based HTTP client for the browser and Node.js.
- **React Hook Form** - Performant and flexible forms with easy-to-use validation.
- **React Toastify** - Toast notifications for React applications.
- **Sequelize** - Promise-based ORM for Node.js and TypeScript.
- **Zod** - TypeScript-first schema declaration and validation library.
- **@hello-pangea/dnd** - Drag-and-drop library for React applications.
- **Tanstack/React-Query** - Data fetching and caching library for React.
- **Shadcn** - Components for building accessible UI.

## Setup and Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Skaimarvas/fullkanbantask.git
   cd fullkanbantask
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
   NEXT_PUBLIC_API_URL=your_api_url

   ```

4. **Run the development server:**

   ```bash
   ...src/kanban-api node index.js
   ```

   Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Usage

### Development

To start the development server, use:

```bash
...src/kanban-api node index.js
```

### Production

To start the application in production mode, ensure that your environment variables are properly configured and use:

```bash
npm run dev
```

## Project Structure

```plaintext
/
|-- public/               # Static files like images, fonts, etc.
|-- src/
    |-- api/              # Contains code for handling API requests
        |-- controllers/  # Business logic and handling of specific API endpoints
    |-- components/       # React components
        |-- ui/           # Reusable UI components used across different parts of the application
    |-- interfaces/       # TypeScript interfaces and types used for type checking and ensuring type safety
    |-- kanban-api/
    |-- config/           # Configuration files for the API (database config, API keys, etc.)
    |-- models/           # Database models representing entities
    |-- routes/           # API route definitions (using Express Router)
    |-- services/         # Business logic (services) that interact with the database via models
    |-- index.js          # Entry point for the Kanban API, where you initialize Express and define middleware
    |-- lib/              # Utility functions and shared libraries that can be used across the application
    |-- mock/             # Mock data for testing and development purposes, simulating API responses or sample data
    |-- pages/            # Next.js pages
    |-- styles/           # Global styles
|-- .env                  # Environment-specific variables (e.g., API keys, database connection strings)(not included in version control)
|-- .env.development      # Environment variables (not included in version control)
|-- next.config.js        # Next.js configuration file
|-- package.json          # Node.js dependencies and scripts
|-- README.md             # Project documentation
```

## Api Endpoints

Please check : [public/postman_collection.json](/public/postman_collection.json)

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Submit a pull request.

Please ensure all changes adhere to the project's coding standards.

## Contact

For questions or support, contact Kaim Arvas at skaimarvas@gmail.com or visit our [issues page](https://github.com/Skaimarvas/fullkanbantask/issues).
