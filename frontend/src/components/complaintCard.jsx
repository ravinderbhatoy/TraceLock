import axiosClient from "@/api/axiosClient";
import { useAuth } from "@/context/AuthProvider";
import { Button, Card, Badge } from "flowbite-react";
import { Link } from "react-router-dom";


const ComplaintCard = (props) => {
  const { user, navigate, loading } = useAuth()

  const handleDelete = async () => {
    await axiosClient.delete(`/complaints/${props.id}/`)
    navigate('/complaints')
  }

  return (
    <Card className="w-full max-w-3xl">
      <div className="flex justify-between items-center">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.brand} {props.model} {props.type == 'S' ? 'Stolen' : "Lost"}
          <p className="text-xs text-gray-500 dark:text-gray-400">{props.city}</p>
        </h5>
        {!props.showDetails &&
          <Badge color={props.status == 'rejected' ? "failure" : "green"}>
            {props.status}
          </Badge>
        }
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.desc}
      </p>
      {
        props.showDetails &&
        <Link to={`/complaints/${props.id}`} className="text-blue-500 hover:underline">
          View
        </Link>
      }
      {user && user.id == props.ownerId && (
        <div className="flex gap-4">
          <Button className="!bg-red-500" onClick={handleDelete}>
            Delete
          </Button>
          <Button className="!bg-green-500" onClick={() => { navigate(`/complaints/${props.id}/edit`) }}>
            Edit
          </Button>
        </div>
      )}
    </Card >
  );
}

export default ComplaintCard