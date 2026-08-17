import { useParams } from "react-router-dom"
import axiosClient from "../api/axiosClient";
import { Button, Card, Badge, Alert, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import ComplaintTimeline from "@/components/ComplaintTimeline";
import { useAuth } from "@/context/AuthProvider";

const ViewComplaint = () => {
    const [complaint, setComplaint] = useState(null)
    const [files, setFiles] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [status, setStatus] = useState(complaint?.status)
    const [refresh, setRefresh] = useState(0)

    console.log('status', status)

    const statusMap = {
        "pending_verification": 0,
        "verified": 1,
        "rejected": -1,
        "under_investigation": 3,
        "resolved": 4,
        "closed": 5
    };


    const params = useParams()
    const { user, navigate, isStation } = useAuth()
    const complaintStage = statusMap[complaint?.status] || null;

    const handleDelete = async () => {
        await axiosClient.delete(`/complaints/${complaint.id}/`)
        navigate('/complaints')
    }

    const updateStatus = async (e) => {
        e.preventDefault()
        if (status === complaint?.status) {
            console.log("No changes")
            return
        }
        try {
            const response = await axiosClient.put(`/complaints/${complaint.id}/`, { status: status })
            if (response.status == 200) {
                complaintStage = statusMap[status]
            }
        } catch (error) {
            console.log("Error updating status")
        }
        setRefresh((prev) => prev + 1)
    }

    useEffect(() => {
        const fetchData = async () => {
            const complaintsResponse = await axiosClient.get(`/complaints/${params.id}/`)
            const filesResponse = await axiosClient.get(`/complaints/${params.id}/files/`)
            setComplaint(complaintsResponse.data)
            setFiles(filesResponse.data.results)
            setStatus(complaintsResponse.data.status)
        }
        fetchData()
    }, [refresh])

    return (
        <div className="m-5">
            {showAlert &&
                alert("Are you sure you want to delete this complaint?")
            }

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
                            <Button className="!bg-red-500" onClick={() => setShowAlert(true)}>
                                Delete
                            </Button>
                            <Button className="!bg-green-500" onClick={() => { navigate(`/complaints/${complaint.id}/edit`) }}>
                                Edit
                            </Button>
                        </div>
                    )}
                    {user && user.id == complaint.filed_by && files && files.length > 0 && (
                        <div>
                            <div className="flex gap-4">
                                {files.map((file) => {
                                    const fileExt = file.file.split('.').pop().toLowerCase();
                                    if (fileExt !== 'pdf') {
                                        return <img key={file.id} src={file.file} alt={file.description} className="w-24 h-24 object-cover" />
                                    }
                                })}
                            </div>
                        </div>
                    )}
                    <ComplaintTimeline filed_on={complaint.filed_at} stage={complaintStage} />
                    {complaintStage == -1 &&
                        <p className="text-red-500 text-center italic">This complaint has been rejected</p>}
                    {isStation?.city == complaint.city_name &&
                        <form onSubmit={updateStatus}>
                            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="pending_verification">Pending Verification</option>
                                <option value="verified">Verified</option>
                                <option value="rejected">Rejected</option>
                                <option value="under_investigation">Under Investigation</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </Select>
                            <br />
                            <Button disabled={status == complaint?.status} type="submit">Update</Button>
                        </form>
                    }
                </Card >
            )}
        </div>
    )
}

export default ViewComplaint