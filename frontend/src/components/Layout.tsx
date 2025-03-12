import { Link } from "react-router-dom";
import { Icon, Icons } from "./Icons";
import AddFriendButton from "./AddFriendButton";
import { Image } from "react-bootstrap";
import FriendRequestsOption from "./FriendRequestsOption";
import SidebarChatList from "./sidebar/SidebarChats";

interface SidebarOptions {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: SidebarOptions[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/#",
    Icon: "UserPlus",
  },
  {
    id: 2,
    name: "Community",
    href: "/community",
    Icon: "Community",
  },
];
const Layout: React.FC = () => {
  return (
    <div className="w-full flex h-screen">
      <div className="hidden md:flex h-full w-full max-w-sm grow flex-col gap-y-6 border-r border-gray-200 bg-white px-6">
        <Link to="/chats" className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-indigo-600" />
        </Link>
        <AddFriendButton />

        <div className="text-xs font-semibold leading-6 text-gray-400">
          <SidebarChatList/>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>// All the user chats</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>

              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        to={option.href}
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <FriendRequestsOption />
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
