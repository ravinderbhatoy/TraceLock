# TraceLock

**TraceLock** is a full-stack web application for reporting, tracking, and managing lost or stolen mobile devices and electronics. Citizens can file complaints with supporting evidence files, and police stations can verify, investigate, and resolve them.

---

## 📦 Repository Structure

```text
TraceLock/
├── backend/     # Django REST Framework API (Python 3.14, Django 6)
└── frontend/    # React + Vite web client (React 19)
```

---

## 🚀 Quick Start

### Prerequisites

- **Python** `3.14+`
- **[uv](https://docs.astral.sh/uv/)** (Python package manager)
- **Node.js** `v18+` and **npm** `v9+`

---

### 1. Backend (Django API)

```bash
cd backend

# Install dependencies and run migrations
uv sync
uv run python manage.py migrate

# (Optional) Load seed/fixture data
uv run python manage.py loaddata complaints/fixtures/*.json

# Start the development server
uv run python manage.py runserver
```

API is available at **`http://localhost:8000/api`**

---

### 2. Frontend (React App)

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

App is available at **`http://localhost:5173`**

---

## 🛠️ Tech Stack


### Frontend
| Layer              | Technology                                   |
| --------------------| ----------------------------------------------|
| Framework          | React 19 + Vite                              |
| Routing            | React Router v7                              |
| UI Components      | Flowbite React                               |
| Styling            | Tailwind CSS v4                              |
| Forms & Validation | React Hook Form                              |
| HTTP               | Axios (with CSRF & JWT refresh interceptors) |


### Backend
| Layer | Technology |
|---|---|
| Framework | Django 6 + Django REST Framework |
| Authentication | JWT via `simplejwt` (HTTP-only cookies) |
| Pagination | `PageNumberPagination` (10 items/page) |
| File Storage | Django media files (Pillow) |
| Database | SQLite (development) |

---

## 🔐 Key Architecture Notes

- **JWT via HTTP-only Cookies:** Access tokens are stored in HTTP-only cookies, invisible to JavaScript. The Axios client automatically refreshes expired tokens using a secure refresh token cookie.
- **Token Rotation:** Each refresh request issues a new refresh token and blacklists the old one.
- **Role-based Access:** Users are either regular citizens or station officers. Station officers can update complaint statuses; citizens can only manage their own complaints.
- **CSRF Protection:** The frontend reads the `csrftoken` cookie and attaches it to every mutating request via the `X-CSRFToken` header.
- **File Attachments:** Complaints support up to 5 attachments (PNG, JPEG, PDF). Files are validated on both the client and server.

---

## 📄 Application Routes

| Route                  | Description                             | Auth Required       |
| ------------------------| -----------------------------------------| ---------------------|
| `/`                    | Landing page                            | No                  |
| `/signin`              | Sign in                                 | No                  |
| `/signup`              | Register new account                    | No                  |
| `/complaints`          | Browse & filter complaints (paginated)  | Yes                 |
| `/complaints/:id`      | View complaint details & attached files | Yes                 |
| `/complaints/:id/edit` | Edit a complaint                        | Yes (owner/station) |
| `/register`            | File a new complaint                    | Yes                 |
| `/profile`             | User profile                            | Yes                 |
