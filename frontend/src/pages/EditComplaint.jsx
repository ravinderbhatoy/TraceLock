import {
    Button,
    Label,
    TextInput,
    Textarea,
    Select,
    Datepicker,
    Spinner,
} from "flowbite-react";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axiosClient from "@/api/axiosClient";
import { useAuth } from "@/context/AuthProvider";
import ErrorMessage from "@/components/ErrorMessage";
import { useParams } from "react-router-dom";


const EditComplaint = () => {
    const today = new Date();
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        setError,
        formState: { errors },
    } = useForm();

    const [pickedDate, setPickedDate] = useState(null);
    const params = useParams()
    const [brands, setBrands] = useState(null);
    const [cities, setCities] = useState([]);
    const [complaint, setComplaint] = useState(null)
    const [loading, setLoading] = useState(true)
    const [pageError, setPageError] = useState(null)
    const { navigate } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [brandsRes, citiesRes, complaintRes] = await Promise.all([
                    axiosClient.get("/complaints/brands/"),
                    axiosClient.get("/complaints/cities/"),
                    axiosClient.get(`/complaints/${params.id}/`),
                ]);
                setBrands(brandsRes.data.results)
                setCities(citiesRes.data.results)
                setComplaint(complaintRes.data)
            }
            catch (error) {
                setPageError(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [params.id]);

    useEffect(() => {
        if (!complaint) return;

        reset({
            brand: complaint.brand_id,
            model: complaint.model,
            city: complaint.city_id,
            desc: complaint.desc,
            case: complaint.case,
            date_of_incidence: complaint.date_of_incidence,
        });

        setPickedDate(new Date(complaint.date_of_incidence));
    }, [complaint, reset]);


    const onSubmit = async (data) => {
        const json = JSON.stringify(data);
        try {
            const response = await axiosClient.put(`/complaints/${params.id}/`, json);
            if (response.status === 200) {
                navigate(`/complaints/${params.id}`)
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

    if (loading) {
        return (<div className="flex justify-center items-center p-4 max-w-200 mx-auto"><Spinner /></div>)
    }
    if (pageError) {
        return (<div className="flex justify-center items-center p-4 max-w-200 mx-auto"><ErrorMessage message={pageError} /></div>)
    }

    return (
        <div className="flex flex-col justify-center items-center my-10 max-w-200 mx-auto">
            <h1 className="text-3xl font-semibold text-blue-500 text-center">
                Edit Complaint
            </h1>
            <form
                className="flex w-full max-w-lg flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="brand">Brand Name</Label>
                    </div>
                    <Select {...register("brand")}>
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
                        {...register("model", {
                            required: "Model is required",
                        })}
                    />
                    {errors.model && (
                        <ErrorMessage message={errors.model.message} />
                    )}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="city">City</Label>
                    </div>
                    <Select {...register("city")}>
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
                    <Select {...register("case")}>
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
            </form>
        </div>
    );
};
export default EditComplaint