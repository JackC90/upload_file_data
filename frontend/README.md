# README for Running a Vite App with React

## Introduction

This guide provides step-by-step instructions on how to set up and run a React application using Vite, a modern build tool that offers fast development and optimized builds.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system. You can download it from the [official Node.js website](https://nodejs.org/).
- **Terminal**: Basic knowledge of using the terminal.
- **Code Editor**: A code editor like Visual Studio Code is recommended.

## Setup Instructions

### 1. Go into frontend directory

Run the command to enter the `/frontend` directory from your project root directory.

```
cd frontend
```

### 2. Install Dependencies

Run the following command to install the necessary dependencies for your project:

```
npm install
```

### 3. Create a .env File

Before starting the development server, create a `.env` file in the frontend directory. This file will hold environment variables for your application.

A sample `.env` is provided, and you may use that.

Otherwise, you can create this file manually or by using the following command:

```
touch .env
```

In the `.env` file, define your environment variables prefixed with `VITE_`:

```
VITE_API_URL=http://localhost:8061
```

### 4. Start the Development Server

To start your application and view it in the browser, run:

```
npm run dev
```

You will see an output indicating that your app is running, at `http://localhost:3021` by default. Open this URL in your web browser to view your application.
