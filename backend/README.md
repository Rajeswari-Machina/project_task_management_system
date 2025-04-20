

## 🧪 API Endpoints

###  Authentication (Cookie-Based)

---

####  Register a New User

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "rajeswari",
  "email": "rajeswari@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id_here",
    "username": "rajeswari",
    "email": "rajeswari@example.com"
  }
}
```

📝 **Note:** A secure **HTTP-only cookie** containing a JWT is automatically set upon successful registration.

---

#### Login

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "rajeswari@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "user_id_here",
    "username": "rajeswari",
    "email": "rajeswari@example.com"
  }
}
```

📝 **Note:** The JWT is sent as a secure HTTP-only cookie.

---

#### 📌 Logout

```http
POST /api/auth/logout
```

Clears the authentication cookie.

---

### 👤 User Management

> 🔐 These routes require the client to send the **auth cookie**. No need to send `Authorization` headers manually.

---

#### 📌 Get All Users _(Admin Only)_

```http
GET /api/users
```

**Cookie Auth:** Yes (Sent automatically in browser / via Postman)

**Response:**
```json
[
  {
    "_id": "user_id",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  },
  ...
]
```

---

#### 📌 Get a Specific User

```http
GET /api/users/:id
```

**Cookie Auth:** Yes

**Response:**
```json
{
  "_id": "user_id",
  "username": "rajeswari",
  "email": "rajeswari@example.com",
  "role": "user"
}
```

---

### 📋 Task Management

> 🔐 These routes are also protected and require login via cookie.

---

#### 📌 Get All Tasks

```http
GET /api/tasks
```

**Response:**
```json
[
  {
    "_id": "task_id",
    "title": "Build React UI",
    "description": "Implement responsive design",
    "assignedTo": "user_id",
    "priority": "High",
    "status": "Pending"
  }
]
```

---

#### 📌 Create Task

```http
POST /api/tasks
```

**Request Body:**
```json
{
  "title": "Write API Docs",
  "description": "Document all endpoints clearly",
  "assignedTo": "user_id",
  "priority": "Medium",
  "status": "Pending"
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "task_id",
    "title": "Write API Docs",
    ...
  }
}
```

---

#### 📌 Update Task

```http
PUT /api/tasks/:id
```

**Request Body:**
```json
{
  "status": "Completed"
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "task_id",
    "status": "Completed"
  }
}
```

---

#### 📌 Delete Task

```http
DELETE /api/tasks/:id
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

### 🔐 Cookie-Based Auth Notes

- The backend uses **HTTP-only cookies** to store the JWT.
- Ensure client requests (frontend or Postman) include:
  - `withCredentials: true` (in axios or fetch)
  - **Cookies enabled** in Postman (enable “Send Cookies”)
- **CORS settings** must allow credentials.

---