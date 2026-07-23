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
        <div>
            {complaint && (
                <ComplaintCard
                    brand={complaint.brand}
                    model={complaint.model}
                    type={complaint.case}
                    desc={complaint.desc}
                    pk={complaint.pk}
                    showDetails={false}
                    ownerId={complaint.filed_by}
                />
            )}
        </div>
    )
}

export default ComplaintDetailsPage