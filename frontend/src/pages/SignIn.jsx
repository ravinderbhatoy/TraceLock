import { useForm } from "react-hook-form";
import { useAuth } from "../components/AuthProvider";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
    const response = await axiosClient.post("/token/", data);
    localStorage.setItem("token", JSON.stringify(response.data));
    setToken(response.data);
    navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center border-2 m-12 p-8 border-gray-400 rounded-2xl max-w-200 mx-auto mt-10">
      <h2 className="font-semibold text-3xl">Sign In</h2>
      <form
        className="flex w-full max-w-lg flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Username</Label>
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
};

export default SignIn;
