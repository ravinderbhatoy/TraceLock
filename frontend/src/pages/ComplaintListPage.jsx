import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthProvider";
import ComplaintCard from "@/components/complaintCard";

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
        if (error.response) {
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
    <div>
      <h1 className="text-3xl font-semibold text-blue-500 text-center my-5">
        Recent Complaints
      </h1>
      {complaints?.length ? (
        <ul className="flex flex-col gap-10 items-center">
          {complaints.map((complaint) => (
            <li key={complaint.pk} className="w-full flex justify-center">
              <ComplaintCard
                brand={complaint.brand}
                model={complaint.model}
                type={complaint.case}
                desc={complaint.desc}
                pk={complaint.pk}
                showDetails={true}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaints found.</p>
      )}
    </div>);
};

export default ComplaintListPage;
