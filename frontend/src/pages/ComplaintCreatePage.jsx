import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  Datepicker,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthProvider";

const ComplaintCreatePage = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  // 2. Format to YYYY-MM-DD
  const maxFormattedDate = new Date(year, month, day);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const onSubmit = async (data) => {
    const json = JSON.stringify(data);
    console.log(json);
  };

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
            <Label htmlFor="brand">Brand</Label>
          </div>
          <TextInput
            required
            {...register("brand", { required: "Brand name is required" })}
          />
          {errors.brand && <p>{errors.brand.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="model">Model</Label>
          </div>
          <TextInput
            {...register("Model", { required: "Model is required" })}
          />
          {errors.model && <p>{errors.model.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="city">City</Label>
          </div>
          <Select {...register("city", { required: "City is required" })}>
            <option key={user.city} value={user.city}>
              {user.city}
            </option>
          </Select>
          {errors.city && <p>{errors.city.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="desc">Description</Label>
          </div>
          <Textarea
            {...register("desc", { required: "Description is required" })}
          />
          {errors.desc && <p>{errors.desc.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="case">Complaint Type</Label>
          </div>
          <TextInput
            {...register("case", { required: "Complaint type is required" })}
          />
          {errors.case && <p>{errors.case.message}</p>}
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="date_of_incidence"></Label>
          </div>
          <Datepicker
            maxDate={maxFormattedDate}
            {...register("date_of_incidence", {
              required: "Incidence Date & time is required",
            })}
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
