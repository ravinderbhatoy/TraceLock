import axiosClient from "@/api/axiosClient";
import { useAuth } from "@/context/AuthProvider";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const ComplaintCard = (props) => {
  const { user, navigate } = useAuth()

  const handleDelete = async () => {
    await axiosClient.delete(`/complaints/${props.pk}/`)
    navigate('/complaints')
  }

  return (
    <Card className="w-full max-w-3xl">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.brand} {props.model} {props.type == 'S' ? 'Stolen' : "Lost"}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.desc}
      </p>
      {props.showDetails &&
        <Link to={`/complaints/${props.pk}`}>
          <Button>
            Read more
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Link>
      }
      {user.id == props.ownerId && (
        <Button onClick={handleDelete} className="bg-red-500">
          Delete
        </Button>
      )}
    </Card>
  );
}

export default ComplaintCard