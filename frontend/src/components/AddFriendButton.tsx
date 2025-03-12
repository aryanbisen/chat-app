import React, { useState } from "react";
import { addUser } from "../service/UserService";

const AddFriendButton: React.FC = () => {
  const [receiver, setReceiver] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addUser(receiver)
  };
  return (
    <div>
      <form className="max-w-sm " onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Add friend by E-Mail or Username
        </label>

        <div className="mt-2 flex gap-4">
          <input
            onChange={(e) => setReceiver(e.target.value)}
            type="text"
            className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 transition duration-300 ease-in-out"
            placeholder="johndoe@example.com"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Button
          </button>
        </div>
        <p className="mt-1 text-sm text-red-600"></p>
      </form>
    </div>
  );
};

export default AddFriendButton;
