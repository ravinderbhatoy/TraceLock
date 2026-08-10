import { Routes, Route } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { Spinner } from "flowbite-react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";

import ListComplaints from "./pages/ListComplaints";
import RegisterComplaint from "./pages/RegisterComplaint";
import ViewComplaint from "./pages/ViewComplaint";
import "./App.css";
import EditComplaint from "./pages/EditComplaint";
import { Suspense, lazy } from "react";
import { createTheme, ThemeProvider } from "flowbite-react";
import NotFound from "./components/NotFound";
import NotAuthorized from "./components/NotAuthorized";
import Dashboard from "./pages/station/Dashboard";

// const stationTheme = createTheme({
//   button: {
//     color: {
//       primary: "bg-green-500 hover:bg-green-600",
//       secondary: "bg-red-500 hover:bg-red-600",
//     }
//   }
// })

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><Spinner size="xl" /></div>}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/unauthorized" element={<NotAuthorized />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/complaints/:id" element={<ViewComplaint />} />
              <Route path="/complaints" element={<ListComplaints />} />
              <Route path="/register" element={<RegisterComplaint />} />
              <Route path="/complaints/:id/edit" element={<EditComplaint />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
