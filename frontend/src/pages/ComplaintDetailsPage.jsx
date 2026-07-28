import { useParams } from "react-router-dom"
import axiosClient from "../api/axiosClient";
import ComplaintCard from "@/components/complaintCard";
import { useState, useEffect } from "react";

const ComplaintDetailsPage = () => {
    const [complaint, setComplaint] = useState(null)
    const params = useParams()

    useEffect(() => {
        const fetchComplaint = async () => {
            const response = await axiosClient.get(`/complaints/${params.pk}/`)
            setComplaint(response.data)
        }
        fetchComplaint()
    }, [])

    return (
        <div className="m-5">
            {complaint && (
                <ComplaintCard
                    brand={complaint.brand_name}
                    model={complaint.model}
                    type={complaint.case}
                    desc={complaint.desc}
                    pk={complaint.pk}
                    showDetails={false}
                    ownerId={complaint.filed_by}
                    city={complaint.city_name}
                    status={complaint.status}
                />
            )}
        </div>
    )
}

export default ComplaintDetailsPage