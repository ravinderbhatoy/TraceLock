import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {username: "", password: ""}
  });

  const { login, navigate } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password);
      navigate("/profile");
    } catch (error) {
      console.log(error)
      alert("Login Failed");
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful){
      reset()
    }
  }, [isSubmitSuccessful, reset])

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
