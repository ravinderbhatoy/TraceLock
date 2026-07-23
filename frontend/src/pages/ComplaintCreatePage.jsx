import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  Datepicker,
} from "flowbite-react";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axiosClient from "@/api/axiosClient";
import { useAuth } from "@/context/AuthProvider";


const ComplaintCreatePage = () => {
  const today = new Date();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [pickedDate, setPickedDate] = useState(null);
  const [brands, setBrands] = useState(null);
  const [cities, setCities] = useState([]);
  const { navigate } = useAuth()

  const onSubmit = async (data) => {
    const json = JSON.stringify(data);
    try {
      const response = await axiosClient.post("/complaints/", json);
      if (response.status.ok) {
        console.log("Success", response)
        navigate('/complaints')
      }
    } catch (error) {
      console.log("Complaint registration errror", error.response.data);
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await axiosClient.get("/complaints/brands/");
      console.log(response);
      setBrands(response.data.results);
    };
    const fetchCities = async () => {
      const response = await axiosClient.get("/complaints/cities/");
      setCities(response.data.results);
    };
    fetchBrands();
    fetchCities();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center border-2  p-4 border-gray-400 rounded-2xl shadow-lg max-w-200 mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-blue-500 text-center">
        Register Complaint
      </h2>
      <form
        className="flex w-full max-w-lg flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="brand">Brand Name</Label>
          </div>
          <Select
            {...register("brand", { required: "Brand name is required" })}
          >
            <option value="">Select brand name</option>
            {brands?.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Select>
          {errors.brand && <p>{errors.brand.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="model">Model</Label>
          </div>
          <TextInput
            id="model"
            {...register("model", { required: "Model is required" })}
          />
          {errors.model && <p>{errors.model.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="city">City</Label>
          </div>
          <Select {...register("city", { required: "City is required" })}>
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
          {errors.city && <p>{errors.city.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="desc">Description</Label>
          </div>
          <Textarea
            id="desc"
            {...register("desc", { required: "Description is required" })}
          />
          {errors.desc && <p>{errors.desc.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="case">Complaint Type</Label>
          </div>
          <Select
            id="case"
            {...register("case", { required: "Complaint type is required" })}
          >
            <option value="S">Stolen</option>
            <option value="L">Lost</option>
          </Select>
          {errors.case && (
            <p className="text-red-500 text-sm">{errors.case.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="date_of_incidence">Incidence Date</Label>
          </div>
          <input
            type="hidden"
            {...register("date_of_incidence", {
              required: "Incidence Date is required",
            })}
          />
          <Datepicker
            id="date_of_incidence"
            value={pickedDate}
            placeholder="Select a date"
            maxDate={today}
            onChange={(date) => {
              setPickedDate(date);
              setValue("date_of_incidence", date, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
          {errors.date_of_incidence && (
            <p>{errors.date_of_incidence.message}</p>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ComplaintCreatePage;
