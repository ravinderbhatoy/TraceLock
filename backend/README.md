# TraceLock

A full-stack web platform for reporting and tracking stolen or lost devices. Built to help the public verify whether a device is stolen before purchasing, and to streamline the complaint filing process with automatic police station assignment.

---

## Features

- File complaints for stolen or lost devices
- Auto-assigns the nearest police station based on the complaint's city
- Public device lookup — anyone can browse complaints without an account
- JWT-based authentication for filing and managing complaints
- Owner-only complaint editing and deletion
- Admin panel for full complaint and user management

---

## Tech Stack

- **Backend:** Django, Django REST Framework
- **Auth:** `djangorestframework-simplejwt`
- **Database:** SQLite (development)
- **Package Manager:** `uv`

---

## Project Structure

```
tracelock/          # Django project settings
complaints/         # Complaint models, views, serializers, API
users/              # Custom user model, station, city, state models, API
```

---

## Setup

### Prerequisites

- Python 3.14+
- `uv`

### Installation

```bash
git clone https://github.com/ravinderbhatoy/tracelock.git
cd tracelock

uv sync
```

### Database

```bash
uv run manage.py migrate
```

### Seed Data

Load location and complaint fixtures:

```bash
uv run manage.py loaddata locations
uv run manage.py loaddata complaints
```

### Run

```bash
uv run manage.py runserver
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/token/` | Obtain access + refresh tokens |
| POST | `/api/token/refresh/` | Refresh access token |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/` | List users |
| GET | `/api/users/{id}/` | User detail |

### Complaints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/complaints/` | List all complaints | No |
| GET | `/api/complaints/{id}/` | Complaint detail | No |
| POST | `/api/complaints/` | File a complaint | Yes |
| PUT/PATCH | `/api/complaints/{id}/` | Update complaint | Owner only |
| DELETE | `/api/complaints/{id}/` | Delete complaint | Owner only |

---

## Complaint Fields

Fields the user provides when filing a complaint:

| Field | Description |
|-------|-------------|
| `model` | Device model name |
| `brand` | Device brand |
| `case` | `S` for Stolen, `L` for Lost |
| `city` | City where the incident occurred |
| `date_of_incidence` | Date of incident (cannot be a future date) |
| `desc` | Description of the incident |

Fields that are auto-set:

| Field | Description |
|-------|-------------|
| `filed_by` | Logged-in user |
| `station` | Auto-assigned based on complaint city |
| `status` | Defaults to `filed` |
| `filed_at` | Timestamp of filing |

---

## Complaint Status Flow

```
filed → pending_verification → verified → under_investigation → resolved → closed
                                        ↘ rejected
```

---

## Authentication

TraceLock uses JWT. Include the access token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

Tokens expire after 5 minutes by default. Use `/api/token/refresh/` with your refresh token to get a new access token.

---

## License

MIT
