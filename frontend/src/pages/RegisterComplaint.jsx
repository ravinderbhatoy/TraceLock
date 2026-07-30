import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  Datepicker,
  FileInput,
  List,
  ListItem,
} from "flowbite-react";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axiosClient from "@/api/axiosClient";
import { useAuth } from "@/context/AuthProvider";
import ErrorMessage from "@/components/ErrorMessage";


const RegisterComplaint = () => {
  const today = new Date();
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const [pickedDate, setPickedDate] = useState(null);
  const [brands, setBrands] = useState(null);
  const [cities, setCities] = useState([]);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false)
  const { navigate } = useAuth()

  const handleFileChange = (event) => {
    setError("files", null)
    // limit file size
    const maxFileSize = 1024 * 1024; // 1MB
    for (let file of event.target.files) {
      if (file.size > maxFileSize) {
        setError("files", { type: "server", message: "Maximum file size is 1MB" });
        return
      }
    }

    if (files.length >= 5) {
      setError("files", { type: "server", message: "Maximum 5 files can be uploaded" });
      return
    }
    if (event.target.files) {
      // only allow unique uploads
      const newFiles = Array.from(event.target.files).filter((file) => {
        return !files.some((existingFile) => existingFile.name === file.name)
      })
      setFiles([...files, ...newFiles])
    }
  }

  const onSubmit = async (data) => {
    setIsUploading(true)
    const json = JSON.stringify(data);
    try {
      const response = await axiosClient.post("/complaints/", json);
      if (response.status === 201) {
        navigate('/complaints')
      }
    } catch (error) {
      console.log("Complaint registration errror", error.response.data);
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        Object.keys(serverErrors).forEach((field) => {
          const message = Array.isArray(serverErrors[field]) ?
            serverErrors[field].join(" ") : serverErrors[field]
          // Handle general/non-field errors separately using 'root'
          if (field === "non_field_errors" || field === "detail") {
            setError("root", { type: "server", message });
          } else {
            // Set field-level error (e.g. username, email, password1)
            setError(field, { type: "server", message });
          }
        })
      }
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await axiosClient.get("/complaints/brands/");
      setBrands(response.data.results);
    };
    const fetchCities = async () => {
      const response = await axiosClient.get("/complaints/cities/");
      setCities(response.data.results);
    };
    fetchBrands();
    fetchCities();
  }, []);

  console.log(files)

  return (
    <div className="flex flex-col justify-center items-center p-4 max-w-200 mx-auto">
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
          {errors.brand && (
            <ErrorMessage message={errors.brand.message} />
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="model">Model</Label>
          </div>
          <TextInput
            id="model"
            {...register("model", { required: "Model is required" })}
          />
          {errors.model && (
            <ErrorMessage message={errors.model.message} />
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="files">Verification Images</Label>
          </div>
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or PDF (Max uploads 5)</p>
              </div>
              <FileInput id="dropzone-file" className="hidden" multiple onChange={handleFileChange} />
            </Label>
          </div>
          {errors.files && (
            <ErrorMessage message={errors.files.message} />
          )}
          {files.length > 0 && (
            <div className="flex justify-between items-start">
              <List>
                {files.map((file, index) => (
                  <ListItem key={index}>
                    {file.name}
                  </ListItem>
                ))}
              </List>
              <Button className="mt-2" color="light" size="sm" onClick={() => setFiles([])}>Clear</Button>
            </div>
          )}
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
          {errors.city && (
            <ErrorMessage message={errors.city.message} />
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="desc">Description</Label>
          </div>
          <Textarea
            id="desc"
            {...register("desc", { required: "Description is required" })}
          />
          {errors.desc && (
            <ErrorMessage message={errors.desc.message} />
          )}
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
            <ErrorMessage message={errors.case.message} />
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
            <ErrorMessage message={errors.date_of_incidence.message} />
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form >
    </div >
  );
};

export default RegisterComplaint;
