import { useEffect, useState } from "react";
import { getFriendRequests, manageFriendRequest } from "../service/UserService";
import { Check, UserPlus, X } from "lucide-react";

const FriendRequests: React.FC = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  let response;

  useEffect(() => {
    const getAllFriendRequests = async () => {
      try {
        const response = await getFriendRequests();
        setFriendRequests(response);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };
    getAllFriendRequests();
  }, []);

  const manageRequest = async (id: string, manager: boolean) => {
    try {
      response = await manageFriendRequest(id, manager)
    } catch (error) {
      console.error("Error accepting friend requests:", error);
    }
  };

  return (
    <div>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request._id} className="flex gap-4 items-center">
            <UserPlus className="text-black" />
            <p className="font-medium text-lg">{request.email}</p>
            <button
              onClick={() => manageRequest(request._id, true)}
              aria-label="accept friend"
              className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <Check className="font-semibold text-white w-3/4 h-3/4" />
            </button>

            <button
              onClick={() => manageRequest(request._id, false)}
              aria-label="deny friend"
              className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <X className="font-semibold text-white w-3/4 h-3/4" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequests;
