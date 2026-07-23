import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { RootLayout } from "./RootLayout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";

import ComplaintListPage from "./pages/ComplaintListPage";
import ComplaintCreatePage from "./pages/ComplaintCreatePage";
import ComplaintDetailsPage from "./pages/ComplaintDetailsPage";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/complaints/:pk" element={<ComplaintDetailsPage />} />
          <Route path="/complaints" element={<ComplaintListPage />} />
          <Route path="/register" element={<ComplaintCreatePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
