import { useContext, useEffect } from "react";
import { User } from "../../User";
import { Store } from "../../Store";
import { getFriends } from "../../service/UserService";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

interface ExtendedMessage extends Message {
  senderImg: string;
  senderName: string;
}

const SidebarChatList: React.FC = () => {
  // When I got protected routes this isnt neccesarry anymore
  const {
    state: { userInfo },
  } = useContext(Store);

  useEffect(() => {
    if (userInfo) {
      const fetchFriendRequests = async () => {
        try {
          const requests = await getFriends();
          console.log(requests);
          
        } catch (error) {
          console.error("Error fetching friend requests:", error);
        }
      };

      fetchFriendRequests();
    }
  }, []);

  return (
    <li //key={friend.id}
    >
      <a
       // href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id)}`}
        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
      >
        {"friend.name"}
        {2 > 0 ? (
          <div className="bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
            {2}
          </div>
        ) : null}
      </a>
    </li>
  );
};

export default SidebarChatList;
