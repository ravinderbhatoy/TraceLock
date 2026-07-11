import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export const ComlaintListPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        // fetch complaints
        const response = await axiosClient.get("/complaints/");
        if (response && response.data) {
          setComplaints(response.data.results);
        }
      } catch (err) {
        setError(true);
        console.log(err.response.status);
        console.log(err.response.data);
      } finally {
        setLoading(false);
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
