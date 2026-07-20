import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Textarea,
  Select,
} from "flowbite-react";
import axiosClient from "../api/axiosClient";

const SignUp = () => {
  const [cities, setCities] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const json = JSON.stringify(data);
    try {
      const response = await axiosClient.post("/users/auth/register/", json);
      console.log(response);
    } catch (error) {
      console.error("Error signing up:", error.response.data);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      const response = await axiosClient.get("/complaints/cities/");
      setCities(response.data.results);
    };
    fetchCities();
  }, []);

  console.log(cities);

  return (
    <div className="flex flex-col justify-center items-center border-2  p-4 border-gray-400 rounded-2xl shadow-lg max-w-200 mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-blue-500 text-center">
        Sign Up
      </h2>
      <form
        className="flex w-full max-w-lg flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="first_name">First Name</Label>
          </div>
          <TextInput
            required
            {...register("first_name", { required: "first name is required" })}
          />
          {errors.first_name && <p>{errors.first_name.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="last_name">Last Name</Label>
          </div>
          <TextInput
            {...register("last_name", { required: "last name is required" })}
          />
          {errors.last_name && <p>{errors.last_name.message}</p>}
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
            <Label htmlFor="address">Address</Label>
          </div>
          <Textarea
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <TextInput
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Email</Label>
          </div>
          <TextInput
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">password</Label>
          </div>
          <TextInput
            type="password"
            {...register("password1", { required: "Password is required" })}
          />
          {errors.password1 && <p>{errors.password1.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2">Confirm password</Label>
          </div>
          <TextInput
            type="password"
            {...register("password2", {
              required: "Please confirm your password",
            })}
          />
          {errors.password2 && <p>{errors.password2.message}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUp;
