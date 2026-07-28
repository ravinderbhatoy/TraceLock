# TraceLock — Frontend Application

**TraceLock** is a modern web application designed to help users report, track, and manage lost or stolen mobile devices and electronics. This frontend project is built with React 19, Vite, React Router v7, and Tailwind CSS.

---

## 🚀 Features

- **Lost & Stolen Device Search:** Browse and search through registered device complaints with search filters.
- **Complaint Registration & Filing:** Form handling with real-time validation for reporting lost or stolen devices (including IMEI numbers, device brand, model, purchase date, and location).
- **User & Station Authentication:**
  - Secure registration and sign-in flows.
  - Automatic JWT token refresh via Axios interceptors.
  - `AuthContext` provider managing login status and role-based access.
- **User Dashboard & Profile:** Personal profile overview with avatar support and history of filed complaints.
- **Complaint Management:** Track complaint statuses (Pending, Investigating, Resolved, etc.) and view detailed complaint records.

---

## 🛠️ Tech Stack

- **Core Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling & UI:**
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Flowbite React](https://flowbite-react.com/)
  - [Base UI](https://base-ui.com/)
  - [Shadcn UI](https://ui.shadcn.com/)
  - `@fontsource-variable/geist` font family
- **Form Management & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **HTTP Client & Security:** [Axios](https://axios-http.com/) (with interceptors for CSRF & automated JWT refresh) and `js-cookie`

---

## 📁 Project Structure

```text
frontend/
├── public/              # Static public assets
├── src/
│   ├── api/             # Axios client instance & auth/CSRF interceptors
│   ├── assets/          # Application images and media
│   ├── components/      # Reusable UI components (Navbar, Footer, ComplaintCard, ErrorMessage)
│   ├── context/         # AuthContext & AuthProvider for state management
│   ├── pages/           # Application pages:
│   │   ├── Home.jsx                 # Landing page
│   │   ├── SignIn.jsx               # User/Station sign-in
│   │   ├── SignUp.jsx               # Account registration
│   │   ├── Profile.jsx              # User profile & avatar management
│   │   ├── ComplaintListPage.jsx    # Filterable list of complaints
│   │   ├── ComplaintDetailsPage.jsx # Detailed complaint view
│   │   └── ComplaintCreatePage.jsx  # Complaint registration form
│   ├── utils/           # Helper functions & ProtectedRoute route guards
│   ├── App.jsx          # Route declarations & main application layout
│   ├── main.jsx         # React application entry point
│   └── index.css        # Tailwind CSS imports & base styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
└── package.json         # Scripts and project dependencies
```

---

## 🏁 Quick Start

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **TraceLock Backend API**: Running on `http://localhost:8000/api`

### Installation & Local Setup

1. **Clone the repository & navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Builds the production bundle to the `dist` directory. |
| `npm run preview` | Locally previews the production build output. |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues. |

---

## 🔐 Key Architecture Highlights

- **Axios Interceptors:** Automatic handle for token refreshment. If a request returns a `401 Unauthorized` status, the response interceptor automatically invokes `/token/refresh/` using secure HTTP-only cookies and retries queued requests seamlessly.
- **Protected Routing:** `ProtectedRoute` wrapper secures user-only pages (`/profile`, `/register`, `/complaints`), redirecting unauthenticated users to `/signin`.
- **Form Processing:** Utilizes `React Hook Form` for optimal re-render performance and schema validation.
