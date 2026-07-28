import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthProvider";
import ComplaintCard from "@/components/complaintCard";
import { useSearchParams } from "react-router-dom";

import { Dropdown, DropdownItem } from "flowbite-react";

export const ComplaintListPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(false);
  const { loading, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cities, setCities] = useState([])

  const selectedCity = searchParams.get("city") || "";

  // Helper function to update search parameters
  const handleFilterChange = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }
    setSearchParams(updatedParams);
  };

  useEffect(() => {
    const fetchCities = async () => {
      const response = await axiosClient.get("/complaints/cities/");
      setCities(response.data.results);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    console.log('Query parameter changed to:', searchParams);
    // Fetch data or trigger updates here
  }, [searchParams]);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        // fetch complaints
        const response = await axiosClient.get("/complaints/", {
          params: {
            city: selectedCity || undefined,
          }
        });
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
  }, [searchParams]);

  if (error) return <p>Something went wrong...</p>;
  if (loading) return <p>Loading complaint... </p>;

  return (
    <div className="my-5">
      <div className="flex justify-around">
        <h1 className="text-3xl font-semibold text-blue-500 text-center mb-5">
          Recent Complaints
        </h1>

        {/* City Filter */}
        <Dropdown label={selectedCity ? `City: ${selectedCity}` : "Filter by City"} inline>
          <DropdownItem onClick={() => handleFilterChange("city", "")}>All Cities</DropdownItem>
          {cities.length ? (
            cities.map((city) => (
              <DropdownItem key={city.id} onClick={() => handleFilterChange("city", city.name)}>
                {city.name}
              </DropdownItem>
            ))
          ) : null}
        </Dropdown>
      </div>

      {complaints?.length ? (
        <ul className="flex flex-col gap-10 items-center">
          {complaints.map((complaint) => (
            <li key={complaint.pk} className="w-full flex justify-center">
              <ComplaintCard
                brand={complaint.brand_name}
                model={complaint.model}
                type={complaint.case}
                desc={complaint.desc}
                pk={complaint.pk}
                city={complaint.city_name}
                showDetails={true}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center my-20 text-center">
          <p className="text-2xl font-semibold text-gray-300">
            No complaints found.
          </p>
        </div>
      )}
    </div>);
};

export default ComplaintListPage;
