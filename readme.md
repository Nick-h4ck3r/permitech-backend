# Notes App

This repository is a backend for simple notes app built using Next.js, Node.js, and MongoDB. It allows users to create, read, update, delete and search notes.

## Frontend

The frontend repo is at <https://github.com/Nick-h4ck3r/permitech-assignment>

## Project Structure

The project repository consists of two main directories:

1. **server:** Contains the backend code built with Express, MongoDB, and related dependencies.

2. **client:** Contains the frontend code built with Next, along with necessary dependencies.

## Setting Up the Backend Locally

### Cloning the Repository

```bash
git clone https://github.com/Nick-h4ck3r/permitech-backend.git
```

### Backend (/api)

#### Setting Up Environment Variables

```bash
cd permitech-backend
```

Create a .env file in the api directory and add the following environment variables:

```bash
PORT=
MONGODB_URI=
JWT_SECRET=
```

#### Installing Dependencies

```bash
npm i
```

#### Starting the Server

```bash
npm run dev
```

Server will be started on the port specified in the .env file.

## API Documentation for the project

The API documentation for the project is available at <https://github.com/Nick-h4ck3r/permitech-backend/api-guide.md>.
