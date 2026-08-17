# TraceLock

**TraceLock** is a full-stack web application designed for reporting, tracking, and managing lost or stolen mobile devices and electronics. It bridges the gap between citizens filing complaints and police stations verifying, investigating, and resolving incidents with digital evidence tracking.

---

## ✨ Key Features

- 📱 **Citizen Complaint Portal:** Easily file detailed complaints for lost or stolen devices with incident timestamps, locations, and descriptions.
- 📎 **Evidence Attachment:** Upload and manage evidence files (invoices, ID proofs, photos, PDFs) attached to complaints.
- 🏢 **Station Officer Dashboard:** Dedicated dashboard for police station personnel showing key metrics, pending verifications, active investigations, and case resolution controls.
- 🗺️ **Automatic Jurisdiction Routing:** Complaints are automatically mapped to the appropriate police station based on city jurisdiction.
- 🔐 **Secure Authentication System:** Dual-role authentication (Citizen / Station Officer) powered by JWT tokens stored safely in HTTP-only cookies with token rotation and CSRF protection.
- 🔍 **Filtering & Search:** Search and filter complaints by brand, city, case type (*Lost* vs *Stolen*), and status.

---

## 📦 Repository Structure

```text
TraceLock/
├── backend/                  # Django REST Framework API (Python 3.14, Django 6)
│   ├── complaints/           # Complaints, Brands, Cities, and Files app
│   ├── users/                # Custom User model, Police Station accounts & Dashboard views
│   └── tracelock/            # Django project settings and root routing
└── frontend/                 # React 19 single-page application (Vite)
    ├── src/
    │   ├── api/              # Axios client with automatic CSRF & JWT refresh interceptors
    │   ├── components/       # Reusable UI components (Navbar, KPI metrics, Modals, Footer)
    │   ├── context/          # Auth Context for user state and station credentials
    │   ├── pages/            # Application pages (Home, List, Register, Edit, View, Station Dashboard)
    │   └── utils/            # Protected route wrappers and helpers
```

---

## 🛠️ Tech Stack

### Frontend
| Layer | Technology |
| --- | --- |
| **Framework** | React 19 + Vite |
| **Routing** | React Router v7 |
| **UI Components** | Flowbite React |
| **Styling** | Tailwind CSS v4 |
| **Forms & Validation** | React Hook Form |
| **HTTP Client** | Axios (configured with CSRF & JWT auto-refresh interceptors) |

### Backend
| Layer | Technology |
| --- | --- |
| **Framework** | Django 6 + Django REST Framework |
| **Package Manager** | `uv` (Fast Python package installer and resolver) |
| **Authentication** | SimpleJWT with HTTP-only Cookies |
| **Pagination** | `PageNumberPagination` (10 items per page) |
| **File Storage** | Django Media Storage (validated file uploads) |
| **Database** | SQLite (development) |

---

## 🚀 Quick Start

### Prerequisites

- **Python** `3.14+`
- **[uv](https://docs.astral.sh/uv/)** (Python package & project manager)
- **Node.js** `v18+` and **npm** `v9+`

---

### 1. Backend Setup (Django REST API)

```bash
cd backend

# Install dependencies and sync environment
uv sync

# Apply database migrations
uv run python manage.py migrate

# (Optional) Populate seed/fixture data for cities, brands, and stations
uv run python manage.py loaddata complaints/fixtures/*.json

# Start the Django development server
uv run python manage.py runserver
```

The REST API will be available at **`http://localhost:8000/api`**.

---

### 2. Frontend Setup (React SPA)

```bash
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will be running at **`http://localhost:5173`**.

---

## 🔐 Key Architecture & Security Notes

- **HTTP-Only Cookie JWT Storage:** Access and refresh tokens are handled securely via HTTP-Only cookies to protect against XSS (Cross-Site Scripting) attacks.
- **Token Refresh & Rotation:** Axios interceptors seamlessly handle 401 Unauthorized errors by calling `/api/token/refresh/`. Blacklisting is enabled on token rotation.
- **CSRF Defense:** The frontend requests a CSRF token from `/api/csrf/` and includes `X-CSRFToken` headers on all mutating state requests (POST, PUT, PATCH, DELETE).
- **Role-Based Access Control:**
  - **Citizens:** Can file complaints, upload attachments, view public complaints, and update/delete their own filings.
  - **Station Officers:** Access the `/dashboard` route to review complaints assigned to their station, verify complaints, update status, or provide rejection reasons.
- **File Upload Security:** Uploaded files (`pdf`, `png`, `jpg`, `jpeg`) are strictly validated for mime types and file extensions on both backend models and frontend forms.

---

## 🌐 Application Routes

| Route | Description | Auth Required | Access Level |
| --- | --- | --- | --- |
| `/` | Landing & Overview Page | No | Public |
| `/signin` | User Sign In | No | Public |
| `/signup` | User Account Registration | No | Public |
| `/complaints` | Browse & Filter Complaints | Yes | All Users |
| `/complaints/:id` | Detailed View of Complaint & Evidence Files | Yes | All Users |
| `/complaints/:id/edit` | Edit Existing Complaint Details | Yes | Complaint Owner / Officer |
| `/register` | File a New Device Complaint | Yes | All Users |
| `/profile` | User Profile & Complaint History | Yes | All Users |
| `/dashboard` | Police Station Dashboard & Incident Management | Yes | Station Officers |

---

## 🔌 API Reference

### Authentication & User Endpoints
- `POST /api/token/` – Sign in & receive HTTP-Only authentication cookies.
- `POST /api/token/refresh/` – Refresh access token using valid refresh cookie.
- `GET /api/csrf/` – Obtain CSRF token cookie.
- `POST /api/users/register/` – Create a new citizen account.
- `POST /api/users/logout/` – Revoke refresh token and clear auth cookies.
- `GET /api/users/me/` – Fetch current authenticated user info.
- `GET /api/users/stations/` – List police stations.
- `GET /api/users/station/dashboard/` – Station dashboard metrics and statistics.

### Complaints & Master Data Endpoints
- `GET /api/complaints/` – List all complaints (supports filtering & pagination).
- `POST /api/complaints/` – File a new complaint.
- `GET /api/complaints/<id>/` – Retrieve detailed complaint information.
- `PUT / PATCH / DELETE /api/complaints/<id>/` – Update or remove complaint.
- `GET /api/complaints/profile/` – List complaints filed by the active user.
- `POST /api/complaints/<id>/files/` – Upload evidence files to a complaint.
- `GET /api/complaints/cities/` – List available cities.
- `GET /api/complaints/brands/` – List device brands.

---

## 🗄️ Database Models Overview

- **`User` (Custom AbstractUser):** Base user account containing profile image, address, city FK, and station relation check.
- **`Station`:** Represents a police station tied to a specific city and user account.
- **`Complaint`:** Represents a lost/stolen device report. Contains fields for brand, model, description, case type (`Stolen` / `Lost`), date of incidence, filed station, and status workflow.
  - **Status Workflow:** `Pending Verification` ➔ `Verified` / `Rejected` ➔ `Under Investigation` ➔ `Resolved` / `Closed`.
- **`ComplaintFile`:** Evidence attachments associated with a specific complaint.
- **`City` & `State`:** Master location tables for station mapping and geographical filtering.
- **`Brand`:** Master list of device manufacturers.
