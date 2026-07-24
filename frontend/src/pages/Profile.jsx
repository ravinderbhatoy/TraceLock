import { useAuth } from '../context/AuthProvider'
import React from 'react'
import ComplaintCard from '@/components/complaintCard';
import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import { Button } from 'flowbite-react';

const Profile = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(false);
  const { loading, logout, navigate } = useAuth();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        // fetch complaints
        const response = await axiosClient.get("/complaints/profile");
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

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  if (error) return <p>Something went wrong...</p>;
  if (loading) return <p>Loading complaint... </p>;


  return (
    <div>
      <h1 className="text-3xl font-semibold text-blue-500 text-center my-5">
        Your Complaints
      </h1>
      <Button className='bg-red-500' onClick={handleLogout}>Logout</Button>
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
}

export default Profile