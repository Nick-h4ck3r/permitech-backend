# API Documentation

Base URL: <http://localhost:3000/api>

## Authentication Endpoints

### a) Register User

**Endpoint**: `POST /auth/register`

**Request**:

```json
{
  "username": "newuser",
  "password": "password123"
}
```

**Response (200 OK)**:

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### b) Login User

**Endpoint**: `POST /auth/login`

**Request**:

```json
{
  "username": "existinguser",
  "password": "password123"
}
```

**Response (200 OK)**:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Notes Endpoints

All Notes endpoints require Authentication. Include the token in the Authorization header:
`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### a) Create Note

**Endpoint**: `POST /notes`

**Request**:

```json
{
  "title": "My First Note",
  "body": "This is the content of my first note.",
  "tags": ["personal", "important"]
}
```

**Response (201 Created)**:

```json
{
  "_id": "60c20b9b8e1b8f001f3e9999",
  "title": "My First Note",
  "body": "This is the content of my first note.",
  "tags": ["personal", "important"],
  "user": "60c20b9b8e1b8f001f3e9998",
  "createdAt": "2023-07-05T12:00:00.000Z",
  "updatedAt": "2023-07-05T12:00:00.000Z"
}
```

### b) Get All Notes

**Endpoint**: `GET /notes`

**Response (200 OK)**:

```json
[
  {
    "_id": "60c20b9b8e1b8f001f3e9999",
    "title": "My First Note",
    "body": "This is the content of my first note.",
    "tags": ["personal", "important"],
    "user": "60c20b9b8e1b8f001f3e9998",
    "createdAt": "2023-07-05T12:00:00.000Z",
    "updatedAt": "2023-07-05T12:00:00.000Z"
  },
  {
    "_id": "60c20b9b8e1b8f001f3e9997",
    "title": "Another Note",
    "body": "This is another note.",
    "tags": ["work"],
    "user": "60c20b9b8e1b8f001f3e9998",
    "createdAt": "2023-07-05T13:00:00.000Z",
    "updatedAt": "2023-07-05T13:00:00.000Z"
  }
]
```

### c) Get Single Note

**Endpoint**: `GET /notes/:id`

**Response (200 OK)**:

```json
{
  "_id": "60c20b9b8e1b8f001f3e9999",
  "title": "My First Note",
  "body": "This is the content of my first note.",
  "tags": ["personal", "important"],
  "user": "60c20b9b8e1b8f001f3e9998",
  "createdAt": "2023-07-05T12:00:00.000Z",
  "updatedAt": "2023-07-05T12:00:00.000Z"
}
```

### d) Update Note

**Endpoint**: `PUT /notes/:id`

**Request**:

```json
{
  "title": "Updated Note Title",
  "body": "This is the updated content of my note.",
  "tags": ["personal", "important", "updated"]
}
```

**Response (200 OK)**:

```json
{
  "_id": "60c20b9b8e1b8f001f3e9999",
  "title": "Updated Note Title",
  "body": "This is the updated content of my note.",
  "tags": ["personal", "important", "updated"],
  "user": "60c20b9b8e1b8f001f3e9998",
  "createdAt": "2023-07-05T12:00:00.000Z",
  "updatedAt": "2023-07-05T14:00:00.000Z"
}
```

### e) Delete Note

**Endpoint**: `DELETE /notes/:id`

**Response (200 OK)**:

```json
{
  "message": "Note deleted successfully"
}
```

### f) Search Notes

**Endpoint**: `GET /notes/search?q=searchterm`

**Response (200 OK)**:

```json
[
  {
    "_id": "60c20b9b8e1b8f001f3e9999",
    "title": "Note containing searchterm",
    "body": "This note contains the searchterm in its content.",
    "tags": ["searchterm"],
    "user": "60c20b9b8e1b8f001f3e9998",
    "createdAt": "2023-07-05T12:00:00.000Z",
    "updatedAt": "2023-07-05T12:00:00.000Z"
  }
]
```

This documentation covers all the endpoints of the API. Each endpoint includes the HTTP method, the path, an example request (where applicable), and an example response. Remember that all note-related endpoints require authentication, so the token must be included in the Authorization header for these requests.
