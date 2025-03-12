import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

const Profil: React.FC = () => {
  const navigate = useNavigate();
  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);


  return (
    <div
      className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={userInfo ? () => navigate("/profile") : () => navigate("/login")}
    >
      {userInfo ? (
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Profilbild"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {userInfo.firstName} {userInfo.lastName}
            </h2>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>
        </div>
      ) : (
        <div>Login</div>
      )}
    </div>
  );
};

export default Profil;
