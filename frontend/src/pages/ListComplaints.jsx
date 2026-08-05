import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthProvider";
import ComplaintCard from "@/components/complaintCard";
import { useSearchParams } from "react-router-dom";

import { Dropdown, DropdownItem, Pagination, Spinner } from "flowbite-react";

export const ListComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(false);
  const { logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const selectedCity = searchParams.get("city") || "";
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const search = searchParams.get("search") || "";

  // Helper function to update city filter
  const handleCityChange = (cityName) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (cityName) {
      updatedParams.set("city", cityName);
    } else {
      updatedParams.delete("city");
    }
    updatedParams.set("page", "1");
    setSearchParams(updatedParams);
  };

  // Helper function to update page number in URL
  const handlePageChange = (newPage) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPage.toString());
    setSearchParams(updatedParams);
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axiosClient.get("/complaints/cities/");
        setCities(response.data.results || response.data || []);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchComplaint = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axiosClient.get("/complaints/", {
          params: {
            page: page,
            city: selectedCity || undefined,
            search: search || undefined,
          },
        });
        if (response && response.data) {
          setComplaints(response.data.results || []);
          setPagination({
            count: response.data.count || 0,
            next: response.data.next,
            previous: response.data.previous,
          });
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          await logout();
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [page, selectedCity, search]);

  if (error) return <p className="text-center text-red-500 my-10">Something went wrong...</p>;
  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner size="xl" aria-label="Loading spinner" />
      </div>
    );

  const totalPages = Math.ceil(pagination.count / 10) || 1;

  return (
    <div className="my-10">
      <div className="flex justify-around mb-10">
        <h1 className="text-3xl font-semibold text-blue-500 text-center">
          Recent Complaints
        </h1>

        {/* City Filter */}
        <Dropdown label={selectedCity ? `City: ${selectedCity}` : "Select City"} inline>
          <DropdownItem onClick={() => handleCityChange("")}>All Cities</DropdownItem>
          {cities.length
            ? cities.map((city) => (
              <DropdownItem key={city.id} onClick={() => handleCityChange(city.name)}>
                {city.name}
              </DropdownItem>
            ))
            : null}
        </Dropdown>
      </div>

      {complaints?.length ? (
        <ul className="flex flex-col gap-10 items-center">
          {complaints.map((complaint) => (
            <li key={complaint.id} className="w-full flex justify-center">
              <ComplaintCard
                brand={complaint.brand_name}
                model={complaint.model}
                type={complaint.case}
                desc={complaint.desc}
                id={complaint.id}
                city={complaint.city_name}
                showDetails={true}
              />
            </li>
          ))}
          {totalPages > 1 && (
            <div className="flex overflow-x-auto sm:justify-center">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center my-20 text-center">
          <p className="text-2xl font-semibold text-gray-300">No complaints found.</p>
        </div>
      )}
    </div>
  );
};

export default ListComplaints;
