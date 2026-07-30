import { useParams } from "react-router-dom"
import axiosClient from "../api/axiosClient";
import { Button, Card, Badge } from "flowbite-react";
import { useState, useEffect } from "react";
import ComplaintTimeline from "@/components/ComplaintTimeline";
import { useAuth } from "@/context/AuthProvider";

const ViewComplaint = () => {
    const [complaint, setComplaint] = useState(null)
    const [images, setImages] = useState(null)

    const statusMap = {
        "Pending Verification": 0,
        "Verified": 1,
        "Rejected": 2,
        "Under Investigation": 3,
        "Resolved": 4,
        "Closed": 5
    };
    const complaintStage = statusMap[complaint?.status] || null;

    const params = useParams()
    const { user, navigate } = useAuth()
    const handleDelete = async () => {
        await axiosClient.delete(`/complaints/${complaint.id}/`)
        navigate('/complaints')
    }

    useEffect(() => {
        const fetchData = async () => {
            const complaintsResponse = await axiosClient.get(`/complaints/${params.id}/`)
            const imageResponse = await axiosClient.get(`/complaints/${params.id}/images/`)
            setComplaint(complaintsResponse.data)
            setImages(imageResponse.data.results)
        }
        fetchData()
    }, [])

    return (
        <div className="m-5">
            {complaint && (
                <Card className="w-full bg-slate-900/60! background-blue-md! ">
                    <div className="flex justify-between items-center">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {complaint.brand_name} {complaint.model} {complaint.case == 'S' ? 'Stolen' : "Lost"}
                            <p className="text-xs text-gray-500 dark:text-gray-400">{complaint.city_name}</p>
                        </h5>
                        {!complaint.showDetails &&
                            <Badge color={complaint.status == 'rejected' ? "failure" : "green"}>
                                {complaint.status}
                            </Badge>
                        }
                    </div>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {complaint.desc}
                    </p>
                    {
                        complaint.showDetails &&
                        <Link to={`/complaints/${complaint.id}`} className="text-blue-500 hover:underline">
                            View
                        </Link>
                    }
                    {complaintStage < 4 && user && user.id == complaint.filed_by && (
                        <div className="flex gap-4">
                            <Button className="!bg-red-500" onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button className="!bg-green-500" onClick={() => { navigate(`/complaints/${complaint.id}/edit`) }}>
                                Edit
                            </Button>
                        </div>
                    )}
                    {user && user.id == complaint.filed_by && images && images.length > 0 && (
                        <div>
                            <div className="flex gap-4">
                                {images.map((image) => (
                                    <img key={image.id} src={image.image} alt={image.description} className="w-24 h-24 object-cover" />
                                ))}
                            </div>
                        </div>
                    )}
                    <ComplaintTimeline filed_on={complaint.filed_at} stage={complaintStage} />
                </Card >
            )}
        </div>
    )
}

export default ViewComplaint