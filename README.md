# TraceLock

A full-stack web platform for reporting and tracking stolen or lost devices. Built to help the public verify whether a device is stolen before purchasing, and to streamline the complaint filing process with automatic police station assignment.

---

## Features

- File and manage complaints for stolen or lost devices
- Auto-assigns the nearest police station based on the complaint's city
- Public device lookup — search and browse complaints by city or brand
- User registration and account management
- JWT & HTTP-Only Cookie-based authentication
- Owner-only complaint editing and deletion
- User dashboard for managing personal complaints
- Admin panel for full complaint and user management

---

## Tech Stack

### Backend
- **Framework:** Django 6.0+, Django REST Framework
- **Auth:** `djangorestframework-simplejwt` (HTTP-Only Cookie support)
- **CORS:** `django-cors-headers`
- **Database:** SQLite (development)
- **Package Manager:** `uv`

### Frontend
- **Framework:** React 19, Vite
- **Routing:** React Router v7
- **Styling & UI:** Tailwind CSS v4, Flowbite React, `@base-ui/react`, `@fontsource-variable/geist`
- **Form & Validation:** React Hook Form, Zod
- **HTTP Client:** Axios
- **Package Manager:** `npm`

---

## Project Structure

```
TraceLock/
├── backend/                 # Django backend application
│   ├── complaints/          # Complaints app (models, API views, serializers)
│   ├── users/               # Custom user model, stations, auth & registration API
│   ├── tracelock/           # Django project configuration & settings
│   ├── pyproject.toml       # Python package & dependency specifications (uv)
│   └── manage.py
├── frontend/                # React frontend application
│   ├── src/                 # React components, pages, routing, assets
│   ├── package.json         # Node.js dependencies and scripts
│   └── vite.config.js       # Vite configuration
└── README.md                # Project documentation
```

---

## Setup & Installation

### Prerequisites

- Python 3.14+
- `uv` (Python package installer)
- Node.js 18+ and `npm`

---

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   uv sync
   ```

3. **Run database migrations:**
   ```bash
   uv run manage.py migrate
   ```

4. **Load seed data (location and complaints fixtures):**
   ```bash
   uv run manage.py loaddata locations
   uv run manage.py loaddata complaints
   ```

5. **Start the backend development server:**
   ```bash
   uv run manage.py runserver
   ```
   The API will be available at `http://127.0.0.1:8000/`.

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The web application will be available at `http://localhost:5173/`.

---

## API Endpoints

### Auth & Security

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/csrf/` | Obtain CSRF token | No |
| POST | `/api/token/` | Obtain access & refresh tokens (sets HTTP-only cookies) | No |
| POST | `/api/token/refresh/` | Refresh access token using refresh cookie | No |
| POST | `/api/users/register/` | Register a new user account | No |
| POST | `/api/users/logout/` | Logout user and clear JWT cookies | No |

### Users & Stations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/` | List all users | No |
| GET | `/api/users/{id}/` | Get user details by ID | No |
| GET | `/api/users/me/` | Get authenticated user profile | Yes |
| GET | `/api/users/stations/` | List all police stations | No |
| GET | `/api/users/stations/{id}/` | Get police station detail by ID | No |

### Complaints & Reference Data

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/complaints/` | List complaints (filter by city with `?city=`) | No |
| GET | `/api/complaints/{id}/` | Get complaint detail | No |
| POST | `/api/complaints/` | File a new complaint | Yes |
| PUT / PATCH | `/api/complaints/{id}/` | Update complaint details | Owner only |
| DELETE | `/api/complaints/{id}/` | Delete complaint | Owner only |
| GET | `/api/complaints/profile/` | List complaints filed by current user | Yes |
| GET | `/api/complaints/cities/` | List available cities | No |
| GET | `/api/complaints/city/{id}/` | Get city details | No |
| GET | `/api/complaints/brands/` | List device brands | No |

---

## Complaint Fields

### User-Provided Fields

| Field | Type | Description |
|-------|------|-------------|
| `model` | String | Device model name (e.g. iPhone 15 Pro) |
| `brand` | Integer (ID) | Foreign key reference to device Brand |
| `case` | String | `'S'` for Stolen, `'L'` for Lost |
| `city` | Integer (ID) | Foreign key reference to City where incident occurred |
| `date_of_incidence` | DateTime | Date/time of incident (cannot be a future date) |
| `desc` | Text | Description of the incident |

### Auto-Set & Administrative Fields

| Field | Description |
|-------|-------------|
| `filed_by` | Logged-in user who submitted the complaint |
| `station` | Auto-assigned police station based on the complaint's city |
| `status` | Current status (defaults to `'filed'`) |
| `filed_at` | Timestamp when complaint was submitted |
| `rejection_reason` | Optional reason provided if complaint status is `'rejected'` |
| `verified_at` | Timestamp when complaint was verified |
| `resolved_at` | Timestamp when complaint was resolved |

---

## Complaint Status Flow

```
filed → pending_verification → verified → under_investigation → resolved → closed
                                       ↘ rejected
```

---

## Authentication Mechanism

TraceLock uses **HTTP-Only Cookies** for authentication:

- Upon login (`POST /api/token/`) or registration (`POST /api/users/register/`), tokens are set directly in `HTTP-Only` cookies (`access_token` and `refresh_token`).
- API requests from the frontend automatically include these cookies with credentials enabled (`CORS_ALLOW_CREDENTIALS = True`).
- Token refresh (`POST /api/token/refresh/`) rotates tokens seamlessly in cookies.
- Logging out (`POST /api/users/logout/`) blacklists the refresh token and clears the cookies.


---

## License

MIT

