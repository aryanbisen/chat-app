import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { getFriendRequests } from "../service/UserService";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";

const FriendRequestsOption: React.FC = () => {
  const [counter, setCounter] = useState(0);

  //
  const {
    state: { userInfo },
  } = useContext(Store);

  useEffect(() => {
    if (userInfo) {
      const fetchFriendRequests = async () => {
        try {
          const requests = await getFriendRequests();

          setCounter(requests.length);
        } catch (error) {
          console.error("Error fetching friend requests:", error);
        }
      };

      fetchFriendRequests();
    }
  }, []);
  return (
    <Link
      to="/home/friend-requests"
      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
    >
      <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend requests</p>

      {counter > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600">
          {counter}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestsOption;
