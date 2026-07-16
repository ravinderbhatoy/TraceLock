import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ComlaintListPage } from "./pages/ComlaintListPage";
import { Home } from "./pages/Home";
import { RootLayout } from "./RootLayout";
import ComplaintCreatePage from "./pages/ComplaintCreatePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complaints" element={<ComlaintListPage />} />
        <Route path="/register" element={<ComplaintCreatePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
