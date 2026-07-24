import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { login, navigate } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password);
      navigate("/profile");
    } catch (error) {
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

  return (
    <section className="flex flex-col justify-center items-center border-2 m-12 p-8 border-gray-400 rounded-2xl max-w-200 mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-blue-500 text-center">Sign In</h2>
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
          {errors.username && <ErrorMessage message={errors.username.message} />}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">password</Label>
          </div>
          <TextInput
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <ErrorMessage message={errors.password.message} />}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        {errors.root && <ErrorMessage message={errors.root.message} />}
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
};

export default SignIn;
