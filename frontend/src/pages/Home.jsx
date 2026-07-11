import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section className="">
      <h1 className="text-3xl text-blue-500 font-semibold text-center">Welcome To Tracelo</h1>
      <div className="navbar">
        <Link to="/register">Register Complaint</Link>
        <Link to="/complaints">View Complaints</Link>
      </div>
    </section>
  );
};
