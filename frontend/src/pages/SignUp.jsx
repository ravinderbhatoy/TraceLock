import React from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const json = JSON.stringify(data);
    console.log(json);
  };

  return (
    <div className="flex flex-col justify-center items-center border-2 m-12 p-8 border-gray-400 rounded-2xl">
      <h2 className="font-semibold text-3xl">Sign Up</h2>
      <form
        className="flex w-full max-w-lg flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstname">First Name</Label>
          </div>
<TextInput
            {...register("firstname", { required: "first name is required" })}
          />
          {errors.firstname && <p>{errors.firstname.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastname">Last Name</Label>
          </div>
<TextInput
            {...register("lastname", { required: "last name is required" })}
          />
          {errors.lastname && <p>{errors.lastname.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="city">City</Label>
          </div>
<TextInput
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p>{errors.city.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="state">State</Label>
          </div>
<TextInput
            {...register("state", { required: "State is required" })}
          />
          {errors.state && <p>{errors.state.message}</p>}
        </div>
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Confirm password</Label>
          </div>
<TextInput
            {...register("confirmPassword", { required: "Please confirm your password" })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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
