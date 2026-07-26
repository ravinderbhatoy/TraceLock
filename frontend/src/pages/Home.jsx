import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

export const Home = () => {
  const { user } = useAuth();
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl text-blue-500 font-bold">
        Welcome To TraceLock
      </h1>
      <div className="flex gap-4 mt-6">
        <Link
          to="/register"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Register Complaint
        </Link>
        <Link
          to="/complaints"
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          View Complaints
        </Link>
      </div>
    </div>
  );
};

