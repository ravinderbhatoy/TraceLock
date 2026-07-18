import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthProvider";

export const ComplaintListPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(false);
  const { loading, logout } = useAuth();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        // fetch complaints
        const response = await axiosClient.get("/complaints/");
        if (response && response.data) {
          setComplaints(response.data.results);
        }
      } catch (err) {
        if (error.response){
          if (error.response.status == 401) {
            await logout()
          }
        }
        setError(true);
      }
    };
    fetchComplaint();
  }, []);

  if (error) return <p>Something went wrong...</p>;
  if (loading) return <p>Loading complaint... </p>;

  return (
    <section id="">
      <h1>Recent Complaints</h1>
      {complaints?.length ? (
        <ul>
          {complaints.map((complaint, index) => (
            <li key={index}>
              {complaint.brand} {complaint.model}
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaints found.</p>
      )}
    </section>
  );
};
