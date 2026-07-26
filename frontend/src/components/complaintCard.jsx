import axiosClient from "@/api/axiosClient";
import { useAuth } from "@/context/AuthProvider";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const ComplaintCard = (props) => {
  const { user, navigate, loading } = useAuth()

  const handleDelete = async () => {
    await axiosClient.delete(`/complaints/${props.pk}/`)
    navigate('/complaints')
  }

  return (
    <Card className="w-full max-w-3xl">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.brand} {props.model} {props.type == 'S' ? 'Stolen' : "Lost"}
        <p className="text-xs text-gray-500 dark:text-gray-400">{props.city}</p>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.desc}
      </p>
      {props.showDetails &&
        <Link to={`/complaints/${props.pk}`}>
          <Button>
            Read more
          </Button>
        </Link>
      }
      {user && user.id == props.ownerId && (
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      )}
    </Card>
  );
}

export default ComplaintCard