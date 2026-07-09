import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section className="">
      <h1>Welcome To Tracelo</h1>
      <div className="navbar">
        <Link to="/signin">Sigin</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/register">Register Complaint</Link>
        <Link to="/complaints">View Complaints</Link>
      </div>
    </section>
  );
};
